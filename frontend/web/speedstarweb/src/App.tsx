// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; // HomePage where Home component is defined
import Header from './Header';
import Footer from './Footer';
import AboutUs from './AboutUs';
import CategoriesProducts from './Services';
import FAQ from './FAQ';
import FoodDeliveryMenu from './foodMenu';
import { Checkout } from './foodMenu';
import { Cart } from './Cart';
import { MealDetail } from './foodMenu';
import { AppProvider } from './Contexts/appContext'; // Import the AppProvider
import 'leaflet/dist/leaflet.css';
import TrackOrder from './TrackOrder';
import Services from './movers/services';
import QuoteForm from './movers/GetQoute';
import GroceryOrder from './GrocceryDelivery';

function App() {
  return (
    <AppProvider>
      <Router basename="/">
        <div>
          <Header />
          <Routes>
            {/* Define the home route */}
            <Route path="/" element={<Home />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="Service" element={<CategoriesProducts />} />
            <Route path="FAQ" element={<FAQ />} />
            <Route path="foodDeliveryMenu" element={<FoodDeliveryMenu />} />
            <Route path="meal/:id" element={<MealDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="movers" element={<Services />} />
            <Route path="qoute-form" element={<QuoteForm/>} />
            <Route path="GrocceryDelivery" element={<GroceryOrder/>} />
            {/* Add other routes as needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
