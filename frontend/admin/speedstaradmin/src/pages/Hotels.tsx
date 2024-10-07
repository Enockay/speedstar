import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Meal {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  deliveryFee: number;
  hotel: string;
}

interface Hotel {
  id: string;
  name: string;
  logo?: string;
  meals: Meal[];
}

const AdminHotelManager: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingHotel, setEditingHotel] = useState<string | null>(null);
  const [editingMeal, setEditingMeal] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('https://generator-long-tree-8710.fly.dev/hotels');
      console.log(response.data)
      setHotels(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch hotels');
      setLoading(false);
    }
  };

  const handleDeleteHotel = async (id: string) => {
    try {
      await axios.delete(`https://generator-long-tree-8710.fly.dev/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    } catch (err) {
      setError('Failed to delete hotel');
    }
  };

  const handleUpdateMeal = async (hotelId: string, mealId: string, updatedMeal: Partial<Meal>) => {
    try {
      await axios.patch(`https://generator-long-tree-8710.fly.dev/hotels/${hotelId}/meals/${mealId}`, updatedMeal);
      fetchHotels(); // Refresh hotel list with updated data
    } catch (err) {
      setError('Failed to update meal');
    }
  };

  const handleUpdateHotel = async (hotelId: string, updatedHotel: Partial<Hotel>) => {
    try {
      await axios.patch(`https://generator-long-tree-8710.fly.dev/hotels/${hotelId}`, updatedHotel);
      fetchHotels();
    } catch (err) {
      setError('Failed to update hotel');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, uploadType: 'logo' | 'mealImage', hotelId: string, mealId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);


    try {
      if (uploadType === 'logo') {
        await axios.patch(`https://generator-long-tree-8710.fly.dev/hotels/${hotelId}/logo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else if (uploadType === 'mealImage' && mealId) {
        await axios.patch(`https://generator-long-tree-8710.fly.dev/hotels/${hotelId}/meals/${mealId}/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      fetchHotels(); // Refresh data
    } catch (err) {
      setError(`Failed to upload ${uploadType}`);
    }
  };

  if (loading) return <div className="flex justify-center"><div className="loader">Loading...</div></div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold mb-4">Hotel and Meal Management</h1>
      {hotels.length === 0 ? (
        <div>No hotels found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="p-2 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                {editingHotel === hotel.id ? (
                  <input
                    type="text"
                    className="border rounded-md p-1"
                    defaultValue={hotel.name}
                    onBlur={(e) => {
                      handleUpdateHotel(hotel.id, { name: e.target.value });
                      setEditingHotel(null);
                    }}
                  />
                ) : (
                  <span onClick={() => setEditingHotel(hotel.id)} className='text-lg'>{hotel.name}</span>
                )}
              </h2>
              <div>
                {hotel.logo && <img src={hotel.logo} alt={`${hotel.name} logo`} className="w-32 h-32 object-cover mb-4" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logo', hotel.id)}
                  className="mb-2"
                />
              </div>
              <button 
                onClick={() => handleDeleteHotel(hotel.id)}
                className="text-red-500 bg-transparent border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white"
              >
                Delete Hotel
              </button>

              <h3 className="text-lg font-semibold mt-4">Meals</h3>
              {hotel.meals.length > 0 ? (
                <ul>
                  {hotel.meals.map((meal) => (
                    <li key={meal.id} className="my-2">
                      <div className="flex items-center justify-between">
                        <div>
                          {editingMeal === meal.id ? (
                            <input
                              type="text"
                              className="border rounded-md p-1"
                              defaultValue={meal.name}
                              onBlur={(e) => {
                                handleUpdateMeal(hotel.id, meal.id, { name: e.target.value });
                                setEditingMeal(null);
                              }}
                            />
                          ) : (
                            <span onClick={() => setEditingMeal(meal.id)} className='text-xs'>{meal.name}</span>
                          )}
                          <p>
                            Price: ksh
                            <input
                              type="number"
                              className="border rounded-md p-1 w-16"
                              defaultValue={meal.price}
                              onBlur={(e) => handleUpdateMeal(hotel.id, meal.id, { price: parseFloat(e.target.value) })}
                            />
                          </p>
                          <p>
                            Delivery Fee: ksh
                            <input
                              type="number"
                              className="border rounded-md p-1 w-16"
                              defaultValue={meal.deliveryFee}
                              onBlur={(e) => handleUpdateMeal(hotel.id, meal.id, { deliveryFee: parseFloat(e.target.value) })}
                            />
                          </p>
                          {meal.image && <img src={meal.image} alt={meal.name} className="w-16 h-16 object-cover" />}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'mealImage', hotel.id, meal.id)}
                            className="mb-2"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No meals available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHotelManager;
