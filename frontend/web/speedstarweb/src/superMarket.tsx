// src/components/ShoppingPage.tsx
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

interface MarketSelectionProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
}

const MarketSelection: React.FC<MarketSelectionProps> = ({ markets, onSelectMarket }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">Select a Supermarket</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {markets.map((market, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition-shadow"
            onClick={() => onSelectMarket(market)}
          >
            <img src={market.logo} alt={market.name} className="w-24 h-24 object-contain mb-4" />
            <span className="text-lg font-semibold">{market.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// src/types/index.ts
export type Market = {
    name: string;
    logo: string; // URL or path to the logo image
  };
  
  export type Item = {
    name: string;
    quantity: number;
  };
  
  export type DeliveryDetails = {
    name: string;
    address: string;
    phone: string;
  };
  
  export type Order = {
    market: string;
    items: Item[];
    deliveryDetails: DeliveryDetails;
    deliveryFee: number;
  };
  
interface ShoppingPageProps {
  market: Market;
  deliveryFee: number;
  onOrderSuccess: () => void;
}

const ShoppingPage: React.FC<ShoppingPageProps> = ({ market, deliveryFee, onOrderSuccess }) => {
  const [itemText, setItemText] = useState("");
  const [quantityText, setQuantityText] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  // Parse items and quantities into the items state
  useEffect(() => {
    parseItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemText, quantityText]);

  const parseItems = () => {
    const itemList = itemText.split("\n").filter((item) => item.trim() !== "");
    const quantityList = quantityText.split("\n").filter((qty) => qty.trim() !== "");

    const parsedItems: Item[] = itemList.map((item, index) => ({
      name: item.trim(),
      quantity: parseInt(quantityList[index], 10) || 1, // Default to 1 if not specified
    }));

    setItems(parsedItems);
  };

  const handleDeliveryDetailsChange = (field: keyof DeliveryDetails, value: string) => {
    setDeliveryDetails({ ...deliveryDetails, [field]: value });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (items.length === 0) {
      setOrderStatus("Please enter at least one item.");
      return;
    }
    if (!deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
      setOrderStatus("Please fill in all delivery details.");
      return;
    }

    const order: Order = {
      market: market.name,
      items,
      deliveryDetails,
      deliveryFee,
    };

    setLoading(true);
    setOrderStatus("");

    try {
      const response = await axios.post("https://your-api-url.com/api/orders", order);
      console.log(response.data);
      setLoading(false);
      setOrderStatus("Order successfully placed! Your order will arrive in 20 minutes.");
      onOrderSuccess(); // Callback to reset or perform additional actions
    } catch (error) {
      console.error(error);
      setLoading(false);
      setOrderStatus("Error placing order. Please try again.");
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-center mb-6 mt-16">Shopping at {market.name}</h2>

      {/* Item and Quantity Input */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Items to Purchase</h3>
        <div className="flex  gap-0">
          {/* Item Names */}
          <div className="w-full md:w-2/3">
            <label className="block mb-2 font-medium">Item Names</label>
            <textarea
              placeholder="Enter one item per line (e.g., Apples)"
              value={itemText}
              onChange={(e) => setItemText(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 h-40 resize-none"
            />
          </div>
          {/* Quantities */}
          <div className="w-full md:w-1/3">
            <label className="block mb-2 font-medium">Quantities</label>
            <textarea
              placeholder="Enter corresponding quantity per line"
              value={quantityText}
              onChange={(e) => setQuantityText(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 h-40 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={deliveryDetails.name}
            onChange={(e) => handleDeliveryDetailsChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={deliveryDetails.address}
            onChange={(e) => handleDeliveryDetailsChange("address", e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={deliveryDetails.phone}
            onChange={(e) => handleDeliveryDetailsChange("phone", e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Delivery Fee and Submit Button */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold mb-4">Delivery Fee: ksh{deliveryFee}</p>
        {loading ? (
          <ClipLoader size={35} color={"#4A90E2"} loading={loading} />
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Submit Order
          </button>
        )}
      </div>

      {/* Order Status */}
      {orderStatus && (
        <p
          className={`text-center font-semibold text-lg ${
            orderStatus.includes("successfully") ? "text-green-700" : "text-red-700"
          }`}
        >
          {orderStatus}
        </p>
      )}

      {/* Display Parsed Items */}
      {items.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Your Items</h3>
          <ol className="list-decimal list-inside space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                {index + 1}. {item.name} - {item.quantity}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};



const DELIVERY_FEE = 100; // Fixed delivery fee

// Define available supermarkets with logos
const markets: Market[] = [
  { name: "SuperMart", logo: "/logos/market-a.png" },
  { name: "FreshMarket", logo: "/logos/market-b.png" },
  { name: "GroceryHub", logo: "/logos/market-c.png" },
];

const SuperMarket: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const handleSelectMarket = (market: Market) => {
    setSelectedMarket(market);
  };

  const handleOrderSuccess = () => {
    // Optionally reset the form or navigate away
    // For example, reset the selected market to allow a new order
    // setSelectedMarket(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-3 md:p-8">
        {!selectedMarket ? (
          <MarketSelection markets={markets} onSelectMarket={handleSelectMarket} />
        ) : (
          <ShoppingPage
            market={selectedMarket}
            deliveryFee={DELIVERY_FEE}
            onOrderSuccess={handleOrderSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default SuperMarket