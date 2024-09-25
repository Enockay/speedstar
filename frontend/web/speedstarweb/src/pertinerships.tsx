import React from 'react';
import magunasLogo from './assets/magunaslogo.png'; // Placeholder for Magunas logo
import khetiasLogo from './assets/khetiaslogo.jpeg'; // Placeholder for Khetias logo
import localStallsLogo from './assets/locals.jpeg'; // Placeholder for local stalls logo

const LocalPartnerships: React.FC = () => {
  const partners = [
    { name: 'Magunas Supermarket', logo: magunasLogo, description: 'Providing fresh groceries and local produce.' },
    { name: 'Khetias Supermarket', logo: khetiasLogo, description: 'Offering a wide range of quality products and groceries.' },
    { name: 'Local Stalls', logo: localStallsLogo, description: 'Supporting small, community-based grocery stalls and vendors.' },
    // Add more partners here if needed
  ];

  return (
    <>
    <section className="py-16 bg-lime-200">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Supporting Local, Growing Together
        </h2>
        <p className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-8 text-gray-700">
          Speedstar partners with local businesses to deliver the best products while supporting the local economy.
          From grocery stores to market stalls, we are committed to growing together with the community.
        </p>

        {/* Partner Logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
              <img src={partner.logo} alt={`${partner.name} Logo`} className="w-32 h-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-700 text-center">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <svg className="bg-lime-200 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
            className="fill-current text-gray-200"></path>
    </svg>
    </>
  );
};

export default LocalPartnerships;
