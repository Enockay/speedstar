import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Testimonials from './testmonia';
import storage from "../assets/storage.jpeg";
import localmovers from "../assets/localmovers.jpeg";
import assemble from "../assets/house assemble.jpeg";
import office from "../assets/officeRelocation.jpg";
import international from "../assets/internationalmovers.jpeg";
import packing from "../assets/packingServices.jpeg";

// Define the Service interface
interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  location: string;
}

const Services = () => {
  // Static data for services
    const servicesData: Service[] = [
      {
        id: 1,
        name: 'Local Moving',
        description:
          'We specialize in fast, safe, and affordable local moving services within the city. Whether you are moving from one apartment to another or relocating a small office, our expert movers ensure that your belongings are handled with care. Our team will arrive promptly and complete the move efficiently, saving you time and effort. We also offer same-day moves for customers with urgent relocation needs.',
        icon: localmovers, // Replace with actual icon paths
      },
      {
        id: 2,
        name: 'International Moving',
        description:
          'Our international moving service is designed for those relocating to a new country. We handle all the logistics, including customs clearance, international shipping, and safe delivery of your belongings. Our team of experts is well-versed in navigating the complexities of international regulations and ensuring that your move is as seamless as possible. Whether you’re moving overseas for work or personal reasons, we offer customized solutions tailored to your needs, including full packing services and global tracking of your shipment.',
        icon: international, // Replace with actual icon paths
      },
      {
        id: 3,
        name: 'Packing Services',
        description:
          'Packing can be one of the most time-consuming and stressful aspects of moving. Our professional packing services take the hassle out of the process. We use high-quality packing materials to ensure that your items are protected during transport. Our experienced team can pack everything from fragile items such as glassware and electronics to large items like furniture. We also offer partial packing services, allowing you to pack certain items while we handle the rest. Once the packing is complete, we label and organize boxes for an easy unpacking experience.',
        icon: packing, // Replace with actual icon paths
      },
      {
        id: 4,
        name: 'Storage Services',
        description:
          'If you need temporary or long-term storage during your move, we offer secure storage solutions for all your belongings. Our storage facilities are climate-controlled, equipped with 24/7 surveillance, and designed to keep your items safe from damage. Whether you need to store household goods, office equipment, or even furniture, we have flexible storage plans that can be customized to fit your timeline and needs. Our team will help you pack, transport, and store your items, ensuring they are safe until you are ready to move into your new space.',
        icon: storage, // Replace with actual icon paths
      },
      {
        id: 5,
        name: 'Office Relocation',
        description:
          'Relocating an office can be challenging, but our office relocation services are designed to minimize disruption and downtime. We work closely with your team to plan every aspect of the move, from packing up office equipment to setting up your new workspace. Our movers specialize in moving sensitive equipment such as computers, servers, and office furniture. We offer after-hours and weekend services to ensure that your business operations remain uninterrupted. With our efficient process, you’ll be back in business in no time.',
        icon: office, // Replace with actual icon paths
      },
      {
        id: 6,
        name: 'Furniture Assembly',
        description:
          'Our furniture assembly service is perfect for individuals or businesses needing assistance in assembling furniture after a move. Whether you’ve purchased new furniture or need help setting up existing pieces, our team can handle the job. We are skilled at assembling everything from office desks to complex home furniture like beds, cabinets, and shelving units. Our service ensures that your furniture is put together correctly and safely, saving you the hassle of dealing with confusing instructions and tools.',
        icon: assemble, // Replace with actual icon paths
      },
    ];
  
    // Static data for testimonials
    const testimonialsData: Testimonial[] = [
      {
        id: 1,
        name: 'John Doe',
        feedback: 'Speedstar Movers made my move stress-free and quick. Highly recommend!',
        location: 'New York',
      },
      {
        id: 2,
        name: 'Jane Smith',
        feedback: 'Fantastic service! The team was very professional and efficient.',
        location: 'California',
      },
      {
        id: 3,
        name: 'Michael Lee',
        feedback: 'They took great care of my belongings during the move. 5 stars!',
        location: 'Florida',
      },
    ];
  

  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    setServices(servicesData);
    setTestimonials(testimonialsData);
  }, []);

  const handleBookNow = (serviceName: string) => {
    // Navigate to the booking page and pass the service name in the URL
    navigate(`/qoute-form?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <section className="py-12 min-h-screen bg-gray-100 mt-16">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-orange-900">Our Moving Services</h2>
        
        {/* Add a subtitle to encourage user action */}
        <p className="text-center text-lg mb-8 text-gray-700">
          Select a service below and get a free quote today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105" // Hover effect on card
            >
              <img src={service.icon} alt={service.name} className="h-64 mb-4 object-cover w-full rounded" />
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>

              <div className='w-full flex justify-center items-center'>
                <button
                  className="mt-4 bg-orange-950 text-white px-4 py-2 rounded hover:bg-yellow-500 hover:scale-105 transition duration-300 flex items-center"
                  onClick={() => handleBookNow(service.name)}
                > 
                  {/* Add an icon to the button */}
                  <svg 
                    className="w-4 h-4 mr-2"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  Book Now
                </button>
              </div>

              <div className='w-full flex justify-center items-center'>
                {/* Add a secondary CTA button for a free quote */}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition duration-300 flex items-center"
                  onClick={() => handleBookNow(service.name)}
                >
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h8m-8 4h6"></path>
                  </svg>
                  Get a Free Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Testimonials testimonials={testimonials} />
    </section>
  );
};

export default Services;
