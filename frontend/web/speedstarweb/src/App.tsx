import 'leaflet/dist/leaflet.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage'; // HomePage where Home component is defined
import Header from './Header';
import Footer from './Footer';
import AboutUs from './AboutUs';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          {/* Define the home route */}
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
