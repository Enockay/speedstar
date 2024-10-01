// src/AppContext.tsx
import React, { createContext, useState, useEffect, ReactNode ,useContext} from 'react';
import axios from 'axios';
import palaceFries from "../assets/Palace-fries-logo-_2_.svg";
import burger from '../assets/burger.jpeg';
import pancakes from '../assets/pancakes.jpg';
import meatSteak from '../assets/meatstake.jpeg';
import fries from '../assets/fries2.jpeg';
import icecream from '../assets/ice cream .jpeg';

// Define Meal and Hotel interfaces
export interface Meal {
  id: number;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Desserts';
  price: number;
  image: string;
  deliveryFee: number;
  hotel: string;
}

export interface Hotel {
  id: number;
  name: string;
  logo: string;
  meals: Meal[];
}

export interface CartItem {
  meal: Meal;
  quantity: number;
}

interface UserInfo {
  mpesaNumber: string;
  email: string;
  deliveryPoint: string;
}

interface AppContextType {
  hotels: Hotel[];
  cart: CartItem[];
  userInfo: UserInfo;
  addToCart: (meal: Meal, quantity: number) => void;
  removeFromCart: (mealId: number) => void;
  updateQuantity: (mealId: number, amount: number) => void;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  loading: boolean;
  error: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Dummy data for hotels and meals in case API fails
const dummyHotels: Hotel[] = [
  {
    id: 1,
    name: 'Palace Fries',
    logo: palaceFries,
    meals: [
      { id: 1, name: 'Pancakes', category: 'Breakfast', price: 300, image: pancakes, deliveryFee: 50, hotel: 'PalaceFries Hotel' },
      { id: 2, name: 'Burger', category: 'Lunch', price: 600, image: burger, deliveryFee: 60, hotel: "PalaceFries Hotel" },
      { id: 3, name: 'Steak', category: 'Dinner', price: 1200, image: meatSteak, deliveryFee: 70, hotel: "PalaceFries Hotel" },
      { id: 4, name: 'Fries', category: 'Snacks', price: 250, image: fries, deliveryFee: 30, hotel: "PalaceFries Hotel" },
      { id: 5, name: 'Ice Cream', category: 'Desserts', price: 200, image: icecream, deliveryFee: 40, hotel: "PalaceFries Hotel" },
    ],
  },
  // Add other hotels as needed
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    mpesaNumber: '',
    email: '',
    deliveryPoint: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch hotels from API or use dummy data
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Hotel[]>('https://generator-long-tree-8710.fly.dev/hotels', {
        withCredentials: false,
      });
      setHotels(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setHotels(dummyHotels);
      setError('Failed to fetch hotels. Displaying default data.');
    } finally {
      setLoading(false);
    }
  };

  // Load state from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedUserInfo = localStorage.getItem('userInfo');
      fetchHotels();
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  // Cart management functions
  const addToCart = (meal: Meal, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.meal.id === meal.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { meal, quantity }];
      }
    });
  };

  const removeFromCart = (mealId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.meal.id !== mealId));
  };

  const updateQuantity = (mealId: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.meal.id === mealId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        hotels,
        cart,
        userInfo,
        addToCart,
        removeFromCart,
        updateQuantity,
        setUserInfo,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };
