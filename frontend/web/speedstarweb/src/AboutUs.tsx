import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-4 lg:px-24">
      {/* Section 1: Our Journey */}
      <section className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-bold text-center text-gray-900 mb-8">
          Our Journey
        </h2>
        <div className="max-w-5xl mx-auto">
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            Speedstar Delivery Services started as a humble errand service in Chuka, born from the passion of our founders to serve the local community. We recognized the need for fast, reliable, and trustworthy delivery solutions that could cater to the needs of individuals and businesses alike. Our goal was to bridge the gap between local vendors and consumers by providing a seamless delivery experience.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            Over time, Speedstar has grown significantly, achieving key milestones that have defined our growth journey. We formed strategic partnerships with well-known local businesses like <strong>Magunas</strong> and <strong>Khetias</strong>, enabling us to offer diverse services like food delivery, parcel delivery, grocery shopping, and more. Through these partnerships, we’ve expanded our reach and brought value to both local businesses and consumers.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            In addition to our partnerships, we’ve invested in technological advancements such as real-time delivery tracking. Our technology helps customers track their deliveries in real-time, providing transparency and enhancing the overall user experience. Speedstar continues to evolve and grow, aiming to be the go-to delivery service in Kenya and beyond.
          </p>
        </div>
      </section>

      {/* Section 2: Future Plans */}
      <section className="mb-12">
        <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          Future Plans
        </h3>
        <div className="max-w-5xl mx-auto">
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            As Speedstar continues to grow, we are excited about the future. We plan to expand our services to new towns and regions, ensuring more people can experience fast, reliable, and personalized deliveries. Our future endeavors include rolling out advanced tracking technologies that will provide more accurate delivery times and enhanced communication between customers and drivers.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            Additionally, we aim to scale up operations and extend our services to cover larger regions. This will involve building more partnerships with local businesses, expanding our fleet of delivery vehicles, and employing more delivery personnel to meet the growing demand. At Speedstar, we believe that every delivery is an opportunity to bring convenience and happiness to someone’s life, and that belief drives us forward.
          </p>
        </div>
      </section>

      {/* Section 3: Our Mission */}
      <section className="mb-12">
        <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          Why We Do What We Do
        </h3>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            At Speedstar, our mission is simple yet powerful: <strong>“To empower communities by offering fast, reliable, and personalized delivery services that connect local businesses and consumers.”</strong>
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            We believe that reliable delivery services not only help businesses grow but also improve the everyday lives of individuals. Whether it’s a family ordering groceries, a person receiving an important parcel, or a business getting their supplies on time, Speedstar is committed to making these moments possible. 
          </p>
        </div>
      </section>

      {/* Section 4: Our Values */}
      <section>
        <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-8">
          Our Core Values
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-400 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <span className="text-3xl text-white font-bold">R</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Reliability</h4>
            <p className="text-gray-700">
              We are committed to being the most reliable delivery service. Customers can trust us to deliver their items on time, every time.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-400 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <span className="text-3xl text-white font-bold">C</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Community Support</h4>
            <p className="text-gray-700">
              Supporting local businesses and the community is at the heart of what we do. We take pride in partnering with local vendors and giving back to the communities we serve.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-400 w-16 h-16 flex items-center justify-center rounded-full mb-4">
              <span className="text-3xl text-white font-bold">S</span>
            </div>
            <h4 className="text-xl font-semibold mb-2">Sustainability</h4>
            <p className="text-gray-700">
              We are dedicated to creating a sustainable future by adopting eco-friendly practices, from our packaging materials to fuel-efficient delivery methods.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
