import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import burger from './assets/burger.jpeg';
import pancakes from './assets/pancakes.jpg';
import meatSteak from './assets/meatstake.jpeg';
import fries from './assets/fries2.jpeg';
import icecream from './assets/ice cream .jpeg';
import sunsethotel from "./assets/sunsetresort.jpeg";
import pizza from "./assets/pizza2.jpeg";

// Meal and Hotel interfaces
export interface Meal {
  id: number;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Desserts';
  price: number;
  image: string;
  deliveryFee: number;
  hotel: string;
}

interface Hotel {
  id: number;
  name: string;
  logo: string;
  meals: Meal[];
}

interface CartItem {
  meal: Meal;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; // Add this line for setCart
}
// Dummy data for hotels and meals in case API fails
const dummyHotels: Hotel[] = [
  {
    id: 1,
    name: 'Sunset Hotel',
    logo: sunsethotel,
    meals: [
      { id: 1, name: 'Pancakes', category: 'Breakfast', price: 300, image: pancakes, deliveryFee: 50 ,hotel:'sunset Hotel'},
      { id: 2, name: 'Burger', category: 'Lunch', price: 600, image: burger, deliveryFee: 60,hotel:"sunset Hotel" },
      { id: 3, name: 'Steak', category: 'Dinner', price: 1200, image: meatSteak, deliveryFee: 70,hotel:"sunset Hotel" },
      { id: 4, name: 'Fries', category: 'Snacks', price: 250, image: fries, deliveryFee: 30,hotel:"sunsethotel" },
      { id: 5, name: 'Ice Cream', category: 'Desserts', price: 200, image: icecream, deliveryFee: 40,hotel:"sunset Hotel" },
    ],
  },
  // Other hotels...
];

// Main Food Delivery Menu component
const FoodDeliveryMenu: React.FC<CartProps>  = ({cart ,setCart}) => {
  const [hotels, setHotels] = useState<Hotel[]>(dummyHotels); // Initial dummy data
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3002/api/hotels'); // Replace with your actual API endpoint
      setHotels(response.data); // Assume the API returns an array of hotels
      setError(null); // Clear error if the fetch is successful
    } catch (err) {
      setError('Error fetching hotels and meals.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const selectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const addToCart = (meal: Meal, quantity: number) => {
    const existingItem = cart.find((item) => item.meal.id === meal.id);
    if (existingItem) {
      setCart(cart.map(item => item.meal.id === meal.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { meal, quantity }]);
    }
    navigate('/cart'); // Change to the desired route
  };

  return (
    <div
      className="mt-16 bg-cover min-h-screen md:p-8 p-4"
      style={{ backgroundImage: `url(${pizza})` }} // Dynamically set the background image here
    >
      <div className='md:flex justify-between w-full'>
        <h1 className="text-2xl font-bold mb-8 text-center text-white drop-shadow-lg">Food Delivery Menu</h1>
        {/* Link to Cart */}
        <div className="mt-8 text-center">
          <Link to="/cart" className="text-lg font-bold text-white bg-green-500 px-4 py-2 rounded-lg animate-bounce">View Cart ({cart.length} ITEMS)</Link>
        </div>
      </div>
      {/* Display loader */}
      {loading && <p className="text-center text-white">Loading hotels and meals...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Hotel list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="border rounded-lg p-4 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 bg-white"
            onClick={() => selectHotel(hotel)}
          >
            <img src={hotel.logo} alt={hotel.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">{hotel.name}</h2>
            <p className="text-center text-gray-600">Explore Meals</p>
          </div>
        ))}
      </div>

      {/* Meals of the selected hotel */}
      {selectedHotel && (
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-orange-800 p-2 bg-zinc-50 rounded-lg text-center">{selectedHotel.name}'s Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedHotel.meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/meal/${meal.id}`} onClick={() => addToCart(meal, 1)}>
                  <img src={meal.image} alt={meal.name} className="w-full h-52 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                    <p className="text-gray-500 mb-2">Category: {meal.category}</p>
                    <p className="text-gray-700 font-semibold">Price: Ksh {meal.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const MealDetail: React.FC<{ addToCart: (meal: Meal, quantity: number) => void }> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch meal details
  useEffect(() => {
    const hotel = dummyHotels.find(hotel => hotel.meals.find(meal => meal.id === parseInt(id!)));
    const selectedMeal = hotel?.meals.find(meal => meal.id === parseInt(id!));
    setMeal(selectedMeal || null);
  }, [id]);

  if (!meal) {
    return <p>Meal not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(meal, quantity);
    navigate('/foodDeliveryMenu');
  };

  return (
    <div className="container mx-auto p-4 mt-16 bg-white min-h-screen">
      <button onClick={() => navigate('/foodDeliveryMenu')} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mb-4">
        Back to Menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Meal Image */}
        <div>
          <img src={meal.image} alt={meal.name} className="w-full h-96 object-cover rounded-lg shadow-md mb-4" />
        </div>

        {/* Right side: Meal Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{meal.name}</h1>

          {/* Price and Delivery Fee */}
          <p className="text-xl text-gray-700 mb-2">
            <span className="font-semibold">Price:</span> Ksh {meal.price}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <span className="font-semibold">Delivery Fee:</span> Ksh {meal.deliveryFee}
          </p>

          {/* Quantity control */}
          <div className="flex items-center mb-6">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4">
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)} className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="w-full bg-green-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mb-8">
            Add to Cart
          </button>

          {/* Additional Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Meal Description</h2>
            <p className="text-gray-600 mb-6">
              "This is a delicious meal made with fresh ingredients. It's perfect for any time of the day and offers a satisfying experience."
            </p>

            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Ingredient 1</li>
              <li>Ingredient 2</li>
              <li>Ingredient 3</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Nutritional Information</h2>
            <p className="text-gray-600">
              Calories: 500 kcal <br />
              Protein: 20g <br />
              Fat: 10g <br />
              Carbohydrates: 50g
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const [mpesaNumber, setMpesaNumber] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryPoint, setDeliveryPoint] = useState("");

  const updateQuantity = (mealId: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.meal.id === mealId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.meal.price * item.quantity,
    0
  );
  const totalDeliveryFee = cart.reduce(
    (acc, item) => acc + item.meal.deliveryFee * item.quantity,
    0
  );
  const totalAmountPayable = subtotal + totalDeliveryFee;

  const removeFromCart = (mealId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.meal.id !== mealId));
  };

  return (
    <div className="md:p-4 p-2 mt-20 bg-white min-h-screen shadow-lg rounded-lg">
      <h4 className="text-2xl text-center font-bold mb-6">Your Cart</h4>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty.{" "}
          <Link to="/foodDeliveryMenu" className="text-blue-500 underline">
            Go back to the menu
          </Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Cart Items */}
            <div className="bg-gray-100 p-6 rounded-md shadow-md md:max-h-screen max-h-80 overflow-y-auto">
              <ul className="space-y-6">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.meal.image}
                        alt={item.meal.name}
                        className="w-20 h-20 rounded-md object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {item.meal.name}
                        </h3>
                        <p className="text-gray-500">
                          Ksh {item.meal.price} x {item.quantity}
                        </p>
                        <p className="text-gray-400">
                          Delivery: Ksh {item.meal.deliveryFee}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.meal.id, -1)}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.meal.id, 1)}
                      >
                        +
                      </button>
                      <p className="text-lg font-semibold">
                        Ksh {item.meal.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.meal.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Price Summary */}
              <div className="mt-6 text-right">
                <h4 className="text-lg font-semibold">
                  Subtotal: Ksh {subtotal.toFixed(2)}
                </h4>
                <h5 className="mt-1 text-gray-600">
                  Delivery Fee: Ksh {totalDeliveryFee.toFixed(2)}
                </h5>
                <h4 className="text-xl font-bold mt-2">
                  Total: Ksh {totalAmountPayable.toFixed(2)}
                </h4>
              </div>

              <button
                className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-md font-semibold hover:bg-blue-700 w-full"
                onClick={() => navigate("/foodDeliveryMenu")}
              >
                Add More Items
              </button>
            </div>

            {/* Delivery and Payment Info */}
            <div className="bg-gray-50 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>

              {/* M-Pesa Number */}
              <div className="mb-4">
                <label
                  htmlFor="mpesa-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  M-Pesa Number
                </label>
                <input
                  id="mpesa-number"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  type="text"
                  placeholder="Enter your M-Pesa number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Delivery Point */}
              <div className="mb-4">
                <label
                  htmlFor="delivery-point"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Point
                </label>
                <input
                  id="delivery-point"
                  value={deliveryPoint}
                  onChange={(e) => setDeliveryPoint(e.target.value)}
                  type="text"
                  placeholder="Enter your delivery point"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Proceed Button */}
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-green-700"
                onClick={() => alert('You will receive an M-Pesa prompt to complete the payment for Speed Star delivery.')}
              >
                Proceed to Pay
              </button>
              <p className="text-sm text-gray-600 mt-2 text-center">
                You will receive an M-Pesa prompt to pay for Speed Star delivery upon clicking 'Proceed to Pay'.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export const Checkout: React.FC = () => (
  <div className="p-4 mt-16 bg-white min-h-screen">
    <h1 className="text-3xl font-bold mb-4">Checkout</h1>
    <p>Thank you for your order!</p>
  </div>
);

export default FoodDeliveryMenu