import React from 'react';
import moviers from "./assets/movers.jpeg";
import food from "./assets/fooddelivery.jpg";
import groccery from "./assets/grocery.jpg";
import percel from "./assets/perceldelivery2.jpeg";
import LocalPartnerships from './pertinerships';
import DeliveryAreas from './DeliveryAreas';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-amber-900 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/speedstar-hero.jpg)',
          clipPath: 'ellipse(100% 100% at 50% 0%)', // Arc at the top
        }}
      >
        <div className="absolute inset-0 bg-maroon-600 opacity-80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-xl md:text-3xl font-bold mb-4">
            Speedstar Delivery Services: Your Trusted Errand Boys
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Efficient delivery solutions for all your needs – Movers, Food Delivery, Grocery Shopping, and more!
          </p>
          <div className="flex space-x-4">
            <a href="#book" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300">
              Book Now
            </a>
            <a href="#learn-more" className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section with Arc on top and bottom */}
      <section
        className="relative py-16 bg-white"
        style={{
            backgroundImage: 'url(/assets/speedstar-hero.jpg)',
            clipPath: 'ellipse(100% 100% at 50% 0%)',
          }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Fast, Reliable, and Community-Focused
          </h2>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-10">
            Speedstar is your go-to delivery service for residential moves, food deliveries, groceries, and parcel deliveries.
            We partner with local vendors, supermarkets, and restaurants to keep our services personal and community-driven.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="flex flex-col items-center">
              <img src={moviers} alt="Moving Service" className="w-full md:h-72 h-80 object-cover mb-4 rounded-lg shadow-md" />
              <h3 className="text-2xl font-semibold mb-2">Residential Moving</h3>
              <p className="text-gray-950 text-center">
                Reliable and fast movers for residential moves, ensuring a smooth transition to your new home.
              </p>
            </div>
            {/* Service 2 */}
            <div className="flex flex-col items-center">
              <img src={food} alt="Food Delivery" className="w-full md:h-72 h-80 object-cover mb-4 rounded-lg shadow-md" />
              <h3 className="text-2xl font-semibold mb-2">Food Delivery</h3>
              <p className="text-gray-950 text-center">
                Quick and efficient food delivery from your favorite local restaurants, right to your doorstep.
              </p>
            </div>
            {/* Service 3 */}
            <div className="flex flex-col items-center">
              <img src={groccery} alt="Grocery Delivery" className="w-full h-64 object-cover mb-4 rounded-lg shadow-md" />
              <h3 className="text-2xl font-semibold mb-2">Grocery Shopping</h3>
              <p className="text-gray-950 text-center">
                Convenient grocery shopping and delivery from local supermarkets and stores, whenever you need it.
              </p>
            </div>
            {/* Service 4 */}
            <div className="flex flex-col items-center">
              <img src={percel} alt="Parcel Delivery" className="w-full h-64 object-cover mb-4 rounded-lg shadow-md" />
              <h3 className="text-2xl font-semibold mb-2">Parcel Delivery</h3>
              <p className="text-gray-950 text-center">
                Safe and reliable parcel delivery services for sending and receiving packages quickly and securely.
              </p>
            </div>
          </div>
        </div>
      </section>
      <LocalPartnerships/>
      <DeliveryAreas/>
    </div>
  );
};

export default Home;
