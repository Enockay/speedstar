import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Choose a Service',
      description:
        'Select your desired service – Movers, Food Delivery, Grocery Shopping, Supermarket Shopping, Parcel Delivery.',
      icon: 'https://via.placeholder.com/100', // Replace with an actual icon or image
    },
    {
      title: 'Fill Out Details',
      description:
        'Depending on the service, fill out relevant details like pickup and delivery addresses, grocery list, or hotel meal requests.',
      icon: 'https://via.placeholder.com/100', // Replace with an actual icon or image
    },
    {
      title: 'Confirm Booking',
      description:
        'Review the summary of the service and cost, then confirm your booking.',
      icon: 'https://via.placeholder.com/100', // Replace with an actual icon or image
    },
    {
      title: 'Track Your Delivery',
      description:
        'For services like parcel and food delivery, track the delivery status in real-time.',
      icon: 'https://via.placeholder.com/100', // Replace with an actual icon or image
    },
  ];

  return (
    <>
    <div className="w-full py-16 px-6 lg:px-24 bg-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-center text-green-900 mb-8"
      >
        Simple and Seamless
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-xl text-center text-green-900 mb-16"
      >
        Walk through the process of booking a service
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <img
              src={step.icon}
              alt={step.title}
              className="w-36 h-36 mx-auto mb-6"
            />
            <h4 className="text-xl font-bold text-green-900 mb-4">
              {step.title}
            </h4>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="text-center mt-16"
      >
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300">
        <a href="/Service" className="hover:text-yellow-300 transition duration-300">
        Get Started
            </a> 
        </button>
      </motion.div>
    </div>
    <svg className="bg-gray-200 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path className="text-gray-100 fill-current" fillOpacity="0.99" d="M0,160L60,150C120,140,240,120,360,125C480,130,600,160,720,180C840,200,960,210,1080,190C1200,170,1320,130,1380,110L1440,80L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </>
  );
};

export default HowItWorks;
