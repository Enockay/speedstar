import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css"; 
import L from "leaflet";
import icon from "./assets/marker-icon2.png"
// Custom marker icon (can be replaced with a custom image or default)
const markerIcon = new L.Icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const deliveryAreas = [
  { name: "Chuka", coordinates: [0.3317, 37.6536] },
  { name: "Magunas", coordinates: [0.3400, 37.6499] },
  { name: "Khetias", coordinates: [0.3455, 37.6567] },
  { name: "Local Market", coordinates: [0.3298, 37.6455] },
];

// Future Expansion Areas
const futureExpansion = [
  "Meru",
  "Embu",
  "Kirinyaga",
  "Isiolo",
  "Tharaka Nithi",
];

const DeliveryAreas: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 px-5 md:px-20 ">
      {/* Headline */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-700">Where We Deliver</h2>
        <p className="text-lg text-gray-700 mt-2">
          Discover the areas covered by Speedstar Delivery and our future
          expansion plans.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 mb-8 shadow-lg rounded-lg overflow-hidden">
        <MapContainer
          center={[0.3317, 37.6536]} 
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full "
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {deliveryAreas.map((area) => (
           <Marker
           key={area.name}
           position={area.coordinates as [number, number]}  // Ensure it has 2 elements
           icon={markerIcon}
         >
           <Popup>{area.name}</Popup>
         </Marker>
          ))}
        </MapContainer>
      </div>

      {/* List of Key Delivery Areas */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Current Delivery Areas
        </h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {deliveryAreas.map((area) => (
            <li 
              key={area.name} 
              className="text-lg hover:text-orange-600 transition-colors duration-150 cursor-pointer"
            >
              {area.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Future Expansion Section */}
      <div className="bg-orange-100 mt-8 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-orange-700 mb-4">
          Future Expansion Areas
        </h3>
        <p className="text-gray-700 mb-4">
          We are continuously working to expand our services to more regions.
          Here are the areas we plan to cover in the near future:
        </p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {futureExpansion.map((area) => (
            <li 
              key={area} 
              className="text-lg hover:text-orange-600 transition-colors duration-150 cursor-pointer"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DeliveryAreas;
