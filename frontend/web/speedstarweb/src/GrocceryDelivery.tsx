import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

// Define the categories and their respective units of measure
const categories = {
    "Fruits and Vegetables": ["kg", "pcs"],
    "Dairy Products": ["liters", "kg", "pcs"],
    "Meat, Poultry, and Seafood": ["kg", "pcs"],
    "Bakery and Bread": ["pcs", "packs"],
    "Grains, Pasta, and Rice": ["kg", "packs"],
    "Cereals and Breakfast Foods": ["kg", "packs"],
    "Snacks and Confectionery": ["packs", "pcs"],
    "Beverages": ["liters", "bottles"],
    "Frozen Foods": ["kg", "packs"],
    "Canned and Jarred Goods": ["pcs", "packs"],
    "Condiments, Sauces, and Spices": ["pcs", "bottles"],
    "Pantry Staples": ["kg", "pcs"],
    "Personal Care and Household Items": ["pcs", "packs"],
    "Baby Products": ["pcs", "packs"],
    "Pet Supplies": ["kg", "packs"],
    "Health and Wellness": ["pcs", "packs"],
    "Organic and Specialty Foods": ["kg", "pcs"],
};

interface Item {
    category: string;
    name: string;
    quantity: number;
    pricePerUnit: number; // Price per unit (e.g., per kg or per item)
    unit: string;
}

const GroceryOrder: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { category: "", name: "", quantity: 1, pricePerUnit: 0, unit: "" },
    ]); // List of items with price and unit
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");

    // Delivery fee approximation
    const deliveryFee = 50; // Flat fee, you can adjust the logic if needed

    // Add new item row
    const addItem = () => {
        setItems([
            ...items,
            { category: "", name: "", quantity: 1, pricePerUnit: 0, unit: "" },
        ]);
    };

    // Handle item change with correct typing
    const handleItemChange = <K extends keyof Item>(
        index: number,
        field: K,
        value: any
    ) => {
        const newItems = [...items];
        newItems[index][field] =
            field === "quantity" || field === "pricePerUnit" ? Number(value) : value;

        // If the category changes, reset the unit and other fields
        if (field === "category") {
            newItems[index].unit = "";
            newItems[index].name = "";
        }

        setItems(newItems);
    };

    const handleUnitChange = (index: number) => {
        const selectedCategory = items[index].category;

        // Ensure selectedCategory is a valid key in the categories object
        if (selectedCategory in categories) {
            // Use the keyof operator to ensure the key exists in categories
            return categories[selectedCategory as keyof typeof categories];
        }

        return [];
    };

    // Remove an item
    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    // Handle delivery details input change
    const handleDeliveryDetailsChange = (field: string, value: any) => {
        setDeliveryDetails({ ...deliveryDetails, [field]: value });
    };

    // Calculate total cost of items
    const getTotalPrice = () => {
        return items
            .reduce((total, item) => total + item.quantity * item.pricePerUnit, 0)
            .toFixed(2);
    };

    // Grand total including delivery fee
    const getGrandTotal = () => {
        return (Number(getTotalPrice()) + deliveryFee).toFixed(2);
    };

    // Submit the grocery order
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://your-api-url.com/api/orders", {
                items,
                deliveryDetails,
            });
            console.log(response);
            setLoading(false);
            setOrderStatus("Order successfully placed!");
        } catch (error) {
            setLoading(false);
            setOrderStatus("Error placing order. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 md:p-6 p-2 mt-16">
            <div className="container mx-auto md:p-6 p-2 bg-white rounded-lg shadow-lg">
                <h1 className="text-xl font-bold text-gray-800 mb-8 text-center">
                    Grocery Shopping & Delivery
                </h1>

                {/* Grocery Items Form */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Items to Purchase
                    </h2>
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4 mb-4">
                            {/* Category selection */}
                            <div className="w-full md:w-1/3">
                                <select
                                    value={item.category}
                                    onChange={(e) => handleItemChange(index, "category", e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                >
                                    <option value="">Select Category</option>
                                    {Object.keys(categories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Item Name */}
                            <div className="w-full md:w-1/3">
                                <input
                                    type="text"
                                    placeholder="Item name (e.g., Apples)"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Unit selection based on category */}
                            <div className="w-full md:w-1/4">
                                <select
                                    value={item.unit}
                                    onChange={(e) => handleItemChange(index, "unit", e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                >
                                    <option value="">Select Unit</option>
                                    {handleUnitChange(index).map((unit: any) => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity */}
                            <div className="w-full md:w-1/4">
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Price per unit */}
                            <div className="w-full md:w-1/4">
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Price per unit"
                                    value={item.pricePerUnit}
                                    onChange={(e) => handleItemChange(index, "pricePerUnit", e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                />
                            </div>

                            {/* Remove button */}
                            <div className="w-full md:w-auto">
                                <button
                                    onClick={() => removeItem(index)}
                                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded w-full md:w-auto"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add Another Item Button */}
                    <button
                        onClick={addItem}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-full md:w-auto"
                    >
                        Add Another Item
                    </button>
                </div>

                {/* Order Summary */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Order Summary
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2">
                                <span>
                                    {item.quantity} {item.unit} of {item.name}
                                </span>
                                <span>ksh{(item.quantity * item.pricePerUnit).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between py-2 font-semibold border-t border-gray-300">
                            <span>Delivery Fee</span>
                            <span>ksh{deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-lg border-t border-gray-400">
                            <span>Grand Total</span>
                            <span>ksh{getGrandTotal()}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Details Form */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Delivery Details
                    </h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={deliveryDetails.name}
                        onChange={(e) =>
                            handleDeliveryDetailsChange("name", e.target.value)
                        }
                        className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={deliveryDetails.address}
                        onChange={(e) =>
                            handleDeliveryDetailsChange("address", e.target.value)
                        }
                        className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={deliveryDetails.phone}
                        onChange={(e) =>
                            handleDeliveryDetailsChange("phone", e.target.value)
                        }
                        className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
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
            </div>
        </div>
    );
};

export default GroceryOrder;
