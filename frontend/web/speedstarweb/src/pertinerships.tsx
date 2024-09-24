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
  );
};

export default LocalPartnerships;
