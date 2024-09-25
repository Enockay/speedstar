import React from 'react';
import { FaLeaf, FaHandshake, FaTruck } from 'react-icons/fa'; // Icons for values

const AboutUs: React.FC = () => {
  return (
    <div className="w-full mt-7 bg-gray-50 py-16 px-6 lg:px-24">
      {/* Section 1: Our Journey */}
      <section className="mb-16">
        <h3 className="text-4xl lg:text-5xl font-extrabold text-center text-green-900 mb-4 tracking-wide animate-fadeIn">
          Our Journey
        </h3>
        <div className="max-w-5xl mx-auto text-lg lg:text-xl shadow-lg p-8 rounded-lg text-gray-700 leading-relaxed">
          <p className="mb-8">
            <span className="font-semibold text-green-800">Speedstar Delivery Services</span> began as a humble errand solution in Chuka, born from a passion to provide fast, reliable, and trustworthy delivery services to the local community. Our founders saw the need for a seamless connection between vendors and consumers, and that’s how Speedstar came to life—bridging the gap by delivering happiness, one package at a time.
          </p>
          <p className="mb-8">
            Over the years, we’ve expanded significantly, reaching major milestones that have shaped our journey. From forming strategic partnerships with renowned local businesses such as <strong>Magunas</strong> and <strong>Khetias</strong>, to diversifying our offerings to include food delivery, parcel delivery, grocery shopping, and more—we’ve become a trusted name across the region.
          </p>
          <p>
            We have embraced technological advancements to enhance our service, offering real-time tracking and seamless communication. Our goal is to continue evolving and becoming the go-to delivery service, not only in Kenya but across the entire region.
          </p>
        </div>
      </section>

      {/* Section 2: Future Plans */}
      <section className="mb-16">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-800 mb-12 animate-fadeIn">
          Shaping the Future
        </h3>
        <div className="max-w-5xl mx-auto text-lg lg:text-xl text-gray-700 leading-relaxed">
          <p className="mb-8">
            The future of Speedstar is brighter than ever. We’re planning to expand our reach, venture into new regions, and allow more people to experience the efficiency and convenience of our services. We envision introducing cutting-edge tracking technologies to enhance customer-driver communication and offer even more precision.
          </p>
          <p>
            Our growth strategy involves scaling up operations by growing our fleet, forming new partnerships, and bringing on more dedicated delivery personnel. Every delivery is an opportunity to make someone’s day easier, and at Speedstar, we’re committed to ensuring that every package arrives with a smile.
          </p>
        </div>
      </section>

      {/* Section 3: Our Mission */}
      <section className="md:mb-16 mb-8 bg-green-50 py-10 rounded-xl shadow-md p-8">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-center text-green-900 mb-8 animate-fadeIn">
          Why We Deliver
        </h3>
        <div className="max-w-4xl mx-auto text-lg lg:text-xl text-gray-700 leading-relaxed">
          <p className="mb-8">
            Our mission is simple: <strong>“Empowering communities by providing fast, reliable, and personalized delivery solutions that connect local businesses and consumers.”</strong> 
          </p>
          <p>
            Speedstar is about more than just moving packages—it’s about delivering joy, convenience, and reliability. Whether it’s groceries, a much-anticipated parcel, or essential supplies for businesses, we are committed to making these moments seamless and stress-free.
          </p>
        </div>
      </section>

      {/* Section 4: Our Core Values */}
      <section>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-800 mb-12 animate-fadeIn">
          Our Core Values
        </h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-500 w-16 h-16 flex items-center justify-center rounded-full mb-6 hover:bg-yellow-600 transition-all duration-200 ease-in-out">
              <FaTruck className="text-3xl text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-4">Reliability</h4>
            <p className="text-gray-700">
              We pride ourselves on being dependable. Customers can trust us to deliver their items on time, with care and attention.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 w-16 h-16 flex items-center justify-center rounded-full mb-6 hover:bg-green-600 transition-all duration-200 ease-in-out">
              <FaHandshake className="text-3xl text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-4">Community Support</h4>
            <p className="text-gray-700">
              Our mission is rooted in supporting the local community. We are committed to uplifting businesses and creating a positive impact.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-500 w-16 h-16 flex items-center justify-center rounded-full mb-6 hover:bg-blue-600 transition-all duration-200 ease-in-out">
              <FaLeaf className="text-3xl text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-4">Sustainability</h4>
            <p className="text-gray-700">
              We actively work towards a sustainable future through eco-friendly practices, from packaging to fuel-efficient delivery methods.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
