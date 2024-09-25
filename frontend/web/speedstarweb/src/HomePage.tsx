import React from 'react';
import movers from './assets/movers.jpeg';
import food from './assets/fooddelivery.jpg';
import grocery from './assets/grocery.jpg';
import parcel from './assets/perceldelivery2.jpeg';
import LocalPartnerships from './pertinerships';
import DeliveryAreas from './DeliveryAreas';
import background from './assets/speedstartbackground.jpeg';
import HowItWorks from './HowItWorks';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="relative bg-gradient-to-b from-yellow-500 to-orange-500 opacity-65">
          <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center font-bold px-6 md:px-12">
            <h1 className=" animate-pulse text-3xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-lg">
              SPEEDSTAR DELIVERY SERVICES
            </h1>
            <p className="text-lg md:text-2xl font-medium text-gray-900 mb-8 max-w-3xl">
              Fast and reliable delivery solutions for every need – Movers, Food Delivery, Grocery, and Parcels. We get it done quickly and safely!
            </p>
            <div className="flex space-x-4">
              <a
                href="#book"
                className="bg-green-300 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-full font-semibold shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                Book Now
              </a>
              <a
                href="#learn-more"
                className="bg-white hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <svg className="bg-gradient-to-b from-yellow-500 to-orange-500 w-full h-28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="text-gray-50 fill-current" fillOpacity="0.99" d="M0,160L60,150C120,140,240,120,360,125C480,130,600,160,720,180C840,200,960,210,1080,190C1200,170,1320,130,1380,110L1440,80L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>

      {/* Overview Section */}
      <section className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800">
            Fast, Reliable, and Customer-Focused
          </h2>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-10 text-gray-600">
            Speedstar is your go-to delivery service for residential moves, food deliveries, groceries, and parcel deliveries.
            We partner with local vendors, supermarkets, and restaurants to keep our services personal and community-driven.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={movers} alt="Moving Service" className="w-full h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Residential Moving</h3>
              <p className="text-gray-700 text-center">
                Reliable and fast movers for residential moves, ensuring a smooth transition to your new home.
              </p>
            </div>
            {/* Service 2 */}
            <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={food} alt="Food Delivery" className="w-full h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Food Delivery</h3>
              <p className="text-gray-700 text-center">
                Quick and efficient food delivery from your favorite local restaurants, right to your doorstep.
              </p>
            </div>
            {/* Service 3 */}
            <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={grocery} alt="Grocery Delivery" className="w-full h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Grocery Shopping</h3>
              <p className="text-gray-700 text-center">
                Convenient grocery shopping and delivery from local supermarkets and stores, whenever you need it.
              </p>
            </div>
            {/* Service 4 */}
            <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={parcel} alt="Parcel Delivery" className="w-full h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Parcel Delivery</h3>
              <p className="text-gray-700 text-center">
                Safe and reliable parcel delivery services for sending and receiving packages quickly and securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <svg className="bg-gray-50 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="text-lime-200 fill-current" fillOpacity="0.99" d="M0,160L60,150C120,140,240,120,360,125C480,130,600,160,720,180C840,200,960,210,1080,190C1200,170,1320,130,1380,110L1440,80L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>

      <LocalPartnerships />
      <HowItWorks/>
      <DeliveryAreas />
    </div>
  );
};

export default Home;
