import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; // HomePage where Home component is defined
import Header from './Header';
import Footer from './Footer';
import AboutUs from './AboutUs';
import  CategoriesProducts from "./Services";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          {/* Define the home route */}
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Service" element={<CategoriesProducts/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
