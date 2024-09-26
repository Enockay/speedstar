import React, { useState, useEffect } from 'react';
import axios from 'axios';
import burger from './assets/doubleburger.jpeg';
import pancakes from './assets/pancakes.jpg';
import meatSteak from './assets/meatstake.jpeg';
import fries from './assets/fries2.jpeg';
import icecream from './assets/ice cream .jpeg';
import sunsethotel from "./assets/sunsetresort.jpeg";

// Meal and Hotel interfaces
interface Meal {
  id: number;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Desserts';
  price: number;
  image: string;
  deliveryFee: number;
}

interface Hotel {
  id: number;
  name: string;
  logo: string;
  meals: Meal[];
}

// Dummy data for hotels and meals in case API fails
const dummyHotels: Hotel[] = [
  {
    id: 1,
    name: 'Sunset Hotel',
    logo: sunsethotel,
    meals: [
      { id: 1, name: 'Pancakes', category: 'Breakfast', price: 300, image: pancakes, deliveryFee: 50 },
      { id: 2, name: 'Burger', category: 'Lunch', price: 600, image: burger, deliveryFee: 60 },
      { id: 3, name: 'Steak', category: 'Dinner', price: 1200, image: meatSteak, deliveryFee: 70 },
      { id: 4, name: 'Fries', category: 'Snacks', price: 250, image: fries, deliveryFee: 30 },
      { id: 5, name: 'Ice Cream', category: 'Desserts', price: 200, image: icecream, deliveryFee: 40 },
    ],
  },
  // Other hotels...
];

const FoodDeliveryMenu: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>(dummyHotels); // Initial dummy data
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/hotels'); // Replace with your actual API endpoint
      setHotels(response.data); // Assume the API returns an array of hotels
      setError(null); // Clear error if the fetch is successful
    } catch (err) {
      setError('');
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

  return (
    <div className="mt-16 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38')] bg-cover min-h-screen md:p-8 p-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-white drop-shadow-lg">Food Delivery Menu</h1>

      {/* Display loader */}
      {loading && <p className="text-center text-white">Loading hotels and meals...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Selected hotel logo on small screens */}
      {selectedHotel && (
        <div className="md:hidden flex justify-center mb-4">
          <img src={selectedHotel.logo} alt={selectedHotel.name} className="w-24 h-24 mx-auto rounded-full" />
        </div>
      )}

      {/* Hotel list - Hide when a hotel is selected on small screens */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 ${selectedHotel ? 'hidden md:grid' : ''}`}>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`border rounded-lg p-4 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ${
              selectedHotel?.id === hotel.id ? 'bg-yellow-200 border-yellow-500' : 'bg-white'
            }`}
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
          <h2 className="text-3xl font-semibold mb-6 text-white">{selectedHotel.name}'s Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedHotel.meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                  <p className="text-gray-500 mb-2">Category: {meal.category}</p>
                  <p className="text-gray-700 font-semibold">Price: Ksh {meal.price}</p>
                  <p className="text-gray-600">Delivery: Ksh {meal.deliveryFee}</p>
                  <button className="mt-4 w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDeliveryMenu;
