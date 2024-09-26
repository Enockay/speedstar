import React from 'react';
import movers from "./assets/movers.jpeg";
import Delivery from "./assets/fooddelivery.jpg";
import groccery from "./assets/grocery.jpg";
import percel from "./assets/perceldelivery2.jpeg";
import shooping from "./assets/shooping.jpg";

const CategoriesProducts: React.FC = () => {
    return (
        <div className="w-full py-16 px-6 lg:px-24 bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-green-900 mb-4 mt-8">What We Offer</h1>
            <h2 className="text-xl text-center text-gray-700 mb-8">
                Comprehensive Delivery Solutions for Every Need
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Service 1: Speedstar Movers */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={movers}// Replace with actual image
                        alt="Speedstar Movers"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-green-900 mb-4">Speedstar Movers</h3>
                        <p className="text-gray-700 mb-6">
                            We handle residential and office relocations, providing trained personnel, packing materials, and transportation.
                        </p>
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                            Get a Quote
                        </button>
                    </div>
                </div>

                {/* Service 2: Food Delivery */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={Delivery} // Replace with actual image
                        alt="Food Delivery"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-red-600 mb-4">Food Delivery</h3>
                        <p className="text-gray-700 mb-6">
                            Speedstar delivers meals from local hotels and restaurants to your doorstep.
                        </p>
                        <a href="/foodDeliveryMenu" className="block w-full bg-red-500 text-white text-center py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                            Order now
                        </a>

                    </div>
                </div>

                {/* Service 3: Grocery Shopping */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={groccery} // Replace with actual image
                        alt="Grocery Shopping"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-green-500 mb-4">Grocery Shopping</h3>
                        <p className="text-gray-700 mb-6">
                            Need groceries? We shop at local stalls and supermarkets for fresh produce and essentials.
                        </p>
                        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                            Shop Groceries
                        </button>
                    </div>
                </div>

                {/* Service 4: Supermarket Shopping */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={shooping} // Replace with actual image
                        alt="Supermarket Shopping"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Supermarket Shopping</h3>
                        <p className="text-gray-700 mb-6">
                            Supermarket shopping made easy – we pick up and deliver your items straight from leading supermarkets.
                        </p>
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                            Order Supermarket Delivery
                        </button>
                    </div>
                </div>

                {/* Service 5: Parcel Delivery */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src={percel} // Replace with actual image
                        alt="Parcel Delivery"
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4">Parcel Delivery</h3>
                        <p className="text-gray-700 mb-6">
                            Fast, reliable parcel delivery to and from local businesses.
                        </p>
                        <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300">
                            Send a Parcel
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center mt-16">
                <p className="text-lg text-gray-700">Reliable tracking system • Affordable rates • Support for urgent deliveries</p>
                <p className="text-lg text-gray-700 mt-2">Community-focused partnerships with local businesses</p>
            </div>
        </div>
    );
};

export default CategoriesProducts;
