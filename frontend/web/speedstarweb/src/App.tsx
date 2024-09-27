import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; // HomePage where Home component is defined
import Header from './Header';
import Footer from './Footer';
import AboutUs from './AboutUs';
import CategoriesProducts from './Services';
import FAQ from './FAQ';
import FoodDeliveryMenu from './foodMenu';
import { Checkout } from './foodMenu';
import { Cart } from './foodMenu';
import { MealDetail } from './foodMenu';
import { Meal } from './foodMenu';


// Cart item interface
interface CartItem {
  meal: Meal;
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  

  const addToCart = (meal: Meal, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.meal.id === meal.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { meal, quantity }];
      }
    });

    // Navigate to the cart or product selection page
   // Change to the desired route
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Define the home route */}
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Service" element={<CategoriesProducts />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/foodDeliveryMenu" element={<FoodDeliveryMenu  cart={cart} setCart={setCart}/>} />
          <Route path="/meal/:id" element={<MealDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App