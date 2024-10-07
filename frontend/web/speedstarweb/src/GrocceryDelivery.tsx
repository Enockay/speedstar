import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

// Define a fixed delivery fee
const DELIVERY_FEE = 100;

// Market logos and names
const markets = [
  { name: "Market A", logo: "market-a-logo.png" },
  { name: "Market B", logo: "market-b-logo.png" },
  { name: "Market C", logo: "market-c-logo.png" },
];

const GroceryOrder: React.FC = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null); // Selected market
  const [itemText, setItemText] = useState(""); // Items entered by the user
  const [quantityText, setQuantityText] = useState(""); // Quantities entered by the user
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  // Parse items and quantities
  const parseItems = () => {
    const itemList = itemText.split("\n");
    const quantityList = quantityText.split("\n");

    const parsedItems = itemList.map((item, index) => ({
      name: item.trim(),
      quantity: parseInt(quantityList[index], 10) || 1,
    }));

    setItems(parsedItems);
  };

  // Handle delivery details input change
  const handleDeliveryDetailsChange = (field: string, value: any) => {
    setDeliveryDetails({ ...deliveryDetails, [field]: value });
  };

  // Submit the grocery order
  const handleSubmit = async () => {
    setLoading(true);
    parseItems(); // Parse the item and quantity texts
    try {
      const response = await axios.post("https://your-api-url.com/api/orders", {
        items,
        deliveryDetails,
        deliveryFee: DELIVERY_FEE,
        market: selectedMarket,
      });
      console.log(response)
      setLoading(false);
      setOrderStatus("Order successfully placed! Your order will arrive in 20 minutes.");
    } catch (error) {
      setLoading(false);
      setOrderStatus("Error placing order. Please try again.");
    }
  };

  // Select a market
  const selectMarket = (marketName: string) => {
    setSelectedMarket(marketName);
  };

  return (
    <div className="min-h-screen bg-gray-100 md:p-6 p-2 mt-16">
      <div className="container mx-auto md:p-6 p-2 bg-white rounded-lg shadow-lg">
        {!selectedMarket ? (
          // Market Selection Screen
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-8 text-center">
              Select a Market
            </h1>
            <div className="flex justify-center gap-8">
              {markets.map((market, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => selectMarket(market.name)}
                >
                  <img
                    src={market.logo}
                    alt={market.name}
                    className="h-24 w-24 object-contain"
                  />
                  <p className="text-center mt-2">{market.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Grocery List and Order Submission
          <>
            <h1 className="text-xl font-bold text-gray-800 mb-8 mt-8 text-center">
              Grocery Shopping & Delivery ({selectedMarket})
            </h1>

            {/* Item and Quantity Input (Plain Text Format) */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Items to Purchase
              </h2>
              <div className="flex gap-0 w-full p-2 rounded-lg">
                <div className="w-2/3 min-h-64 max-h-80 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2">Item Names</h3>
                  <textarea
                    placeholder="Enter one item per line (e.g., Apples)"
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 min-h-52 w-full"
                  />
                </div>
                <div className="w-1/3 min-h-64 max-h-80 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2">Quantities</h3>
                  <textarea
                    placeholder="Enter corresponding quantity per line"
                    value={quantityText}
                    onChange={(e) => setQuantityText(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 min-h-52 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Delivery Details
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={deliveryDetails.name}
                onChange={(e) => handleDeliveryDetailsChange("name", e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Address"
                value={deliveryDetails.address}
                onChange={(e) => handleDeliveryDetailsChange("address", e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={deliveryDetails.phone}
                onChange={(e) => handleDeliveryDetailsChange("phone", e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              />
            </div>

            {/* Delivery Fee and Submit Button */}
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">
                Delivery Fee: ksh{DELIVERY_FEE}
              </p>
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
              <p className="mt-6 text-center font-semibold text-lg text-green-700">
                {orderStatus}
              </p>
            )}

            {/* Display Parsed Items */}
            {items.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Your Items
                </h2>
                <ul className="list-decimal pl-6">
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroceryOrder;
