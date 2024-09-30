// src/FoodDeliveryMenu.tsx
import React, { useState ,useEffect} from 'react';
import { useNavigate, Link ,useParams} from 'react-router-dom';
import { useAppContext , Meal, Hotel} from './Contexts/appContext';
import pizza from "./assets/pizza2.jpeg";

// Import MealDetail and Checkout as separate components if needed

const FoodDeliveryMenu: React.FC = () => {
  const { hotels, loading, error, addToCart,cart } = useAppContext();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const navigate = useNavigate();

  const selectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleAddToCart = (meal: Meal) => {
    addToCart(meal, 1);
    navigate('/cart');
  };

  return (
    <div
      className="mt-16 bg-cover min-h-screen md:p-8 p-4"
      style={{ backgroundImage: `url(${pizza})` }}
    >
      <div className="md:flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-8 text-center text-white drop-shadow-lg">Food Delivery Menu</h1>
        {/* Link to Cart */}
        <div className="mt-8 mb-5 text-center">
          <Link to="/cart" className="text-lg font-bold text-white bg-green-500 px-4 py-2 rounded-lg animate-bounce">
            View Cart {cart.length} items
          </Link>
        </div>
      </div>
      
      {/* Display loader */}
      {loading && <p className="text-center text-white">Loading hotels and meals...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* If a hotel is selected, show only its logo and menu */}
      {selectedHotel ? (
        <div className="text-center">
          {/* Display selected hotel logo */}
          <img src={selectedHotel.logo} alt={selectedHotel.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
          <h2 className="text-3xl font-semibold mb-6 text-orange-800 p-2 bg-zinc-50 rounded-lg">{selectedHotel.name}'s Menu</h2>
          
          {/* Meals of the selected hotel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedHotel.meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/meal/${meal.id}`} onClick={() => handleAddToCart(meal)}>
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
          
          {/* Back button to show hotels list again */}
          <button
            onClick={() => setSelectedHotel(null)}
            className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Hotels
          </button>
        </div>
      ) : (
        // If no hotel is selected, show the list of hotels
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border rounded-lg p-1 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 bg-slate-300"
              onClick={() => selectHotel(hotel)}
            >
              <img src={hotel.logo} alt={hotel.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">{hotel.name}</h2>
              <p className="text-center text-gray-600">Explore Meals</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { hotels, loading, error, addToCart } = useAppContext();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error) {
      // Find the meal from the hotels data
      if (id) {  // Ensure 'id' is not undefined
        for (const hotel of hotels) {
          console.log(hotel.meals.find(item =>item.id.toString() === id))
          console.log(id);
      
          const foundMeal = hotel.meals.find(item => item.id.toString() === id);
          if (foundMeal) {
            setMeal(foundMeal);
            break;  // Exit the loop once a match is found
          }
        }
      } else {
        console.error("ID is undefined. Please check the URL.");
      }
    }
  }, [id, hotels, loading, error]);

  if (loading) {
    return <p className="text-center mt-16">Loading meal details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-16">{error}</p>;
  }

  if (!meal) {
    return <p className="text-center mt-40 animate-bounce">Meal not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(meal, quantity);
    navigate('/cart');
  };

  return (
    <div className="container mx-auto p-4 mt-16 bg-white min-h-screen">
      <button onClick={() => navigate('/foodDeliveryMenu')} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg mb-4">
        Back to Menu
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Meal Image */}
        <div>
          <img src={meal.image} alt={meal.name} className="w-auto h-96 object-cover rounded-lg shadow-md mb-4" />
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

export const Checkout: React.FC = () => {
  const { cart, userInfo } = useAppContext();
  console.log(cart);
  // Implement your checkout logic here
  return (
    <div className="p-4 mt-16 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p>Thank you for your order, {userInfo.email}!</p>
      {/* Display order details as needed */}
    </div>
  );
};
export default FoodDeliveryMenu;
