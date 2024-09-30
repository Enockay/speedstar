// components/Header.tsx
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaBars } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Speedstar Movers</Link>
        <nav className="space-x-4 hidden md:flex">
          <Link to="/services" className="hover:text-yellow-400">Services</Link>
          <Link to="/about" className="hover:text-yellow-400">About Us</Link>
          <Link to="/testimonials" className="hover:text-yellow-400">Testimonials</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        </nav>
        <div className="space-x-4 hidden md:flex">
          <a href="tel:+123456789" className="flex items-center space-x-1 hover:text-yellow-400">
            <FaPhoneAlt className="w-5 h-5" />
            <span>Call Us</span>
          </a>
          <Link to="/quote" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">Get a Quote</Link>
        </div>
        <button className="md:hidden text-3xl">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
