// src/Cart.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { initiatePayment, sendCartToBackend } from "./apis/paymentApi"; // Placeholder API calls for payment
import { io } from "socket.io-client"; // For real-time websocket connection
import { useAppContext } from "./Contexts/appContext";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, userInfo, setUserInfo } = useAppContext();
  const [mpesaNumber, setMpesaNumber] = useState(userInfo.mpesaNumber);
  const [email, setEmail] = useState(userInfo.email);
  const [deliveryPoint, setDeliveryPoint] = useState(userInfo.deliveryPoint);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io("wss://generator-long-tree-8710.fly.dev/");
    setSocket(newSocket);

    // Listen for real-time updates (e.g., payment status)
    newSocket.on("paymentStatusUpdate", (status: string) => {
      setPaymentStatus(status);
      if (status === "successful") {
        handleCheckout();
      }
      setIsLoading(false);
    });

    // Cleanup function to close the WebSocket connection
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update user info in context when local state changes
  useEffect(() => {
    setUserInfo({ mpesaNumber, email, deliveryPoint });
  }, [mpesaNumber, email, deliveryPoint, setUserInfo]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.meal.price * item.quantity,
    0
  );
  const totalDeliveryFee = cart.reduce(
    (acc, item) => acc + item.meal.deliveryFee * item.quantity,
    0
  );
  const totalAmountPayable = subtotal + totalDeliveryFee;

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const cartData = {
        cart: cart.map(item => ({
          mealId: item.meal.id,
          quantity: item.quantity,
          price: item.meal.price,
          deliveryFee: item.meal.deliveryFee,
        })),
        mpesaNumber,
        email,
        deliveryPoint,
      };

      // Send cart data to the backend
      const response = await sendCartToBackend(cartData);

      if (response.status === 'success') {
        alert('Cart successfully sent to the backend!');
        // Optionally, clear the cart after successful checkout
        // setCart([]);
      } else {
        alert('Error during checkout. Please try again.');
      }
    } catch (error) {
      alert('Error during checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!mpesaNumber || !email || !deliveryPoint) {
      setPaymentStatus("Kindly add delivery details");
      return;
    }
    setIsLoading(true);
    try {
      // API call to initiate payment
      const paymentResponse = await initiatePayment({
        amount: totalAmountPayable,
        mpesaNumber,
        email,
        deliveryPoint,
      });

      if (paymentResponse.status === "success") {
        setPaymentStatus("Waiting for payment confirmation...");
        // Use WebSocket for real-time updates
        socket.emit("paymentInitiated", paymentResponse.transactionId);
      } else {
        setPaymentStatus("Payment initiation failed. Try again.");
        setIsLoading(false);
      }
    } catch (error) {
      setPaymentStatus("Payment failed due to an error.");
      setIsLoading(false);
    }
  };

  return (
    <div className="md:p-4 p-2 mt-20 bg-white min-h-screen shadow-lg rounded-lg">
      <h4 className="text-2xl text-center font-bold mb-6">Your Cart</h4>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty.{" "}
          <Link to="/foodDeliveryMenu" className="text-blue-500 underline">
            Go back to the menu
          </Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cart Items */}
            <div className="bg-gray-100 p-6 rounded-md shadow-md md:max-h-screen max-h-80 overflow-y-auto">
              <ul className="space-y-6">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.meal.image}
                        alt={item.meal.name}
                        className="w-20 h-20 rounded-md object-cover shadow-sm"
                      />
                      <div>
                        <h3 className="text-xl font-semibold ">
                          {item.meal.name}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          Ksh {item.meal.price} x {item.quantity}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Delivery: Ksh {item.meal.deliveryFee}
                        </p>
                        <p className="text-gray-900 text-xs">
                          Hotel: {item.meal.hotel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.meal.id, -1)}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.meal.id, 1)}
                      >
                        +
                      </button>
                      <p className="text-lg font-semibold">
                        Ksh {item.meal.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.meal.id)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Price Summary */}
              <div className="mt-6 text-right">
                <h4 className="text-lg font-semibold">
                  Subtotal: Ksh {subtotal.toFixed(2)}
                </h4>
                <h5 className="mt-1 text-gray-600">
                  Delivery Fee: Ksh {totalDeliveryFee.toFixed(2)}
                </h5>
                <h4 className="text-xl font-bold mt-2">
                  Total: Ksh {totalAmountPayable.toFixed(2)}
                </h4>
              </div>

              <button
                className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-md font-semibold hover:bg-blue-700 w-full"
                onClick={() => navigate("/foodDeliveryMenu")}
              >
                Add More Items
              </button>
            </div>

            {/* Delivery and Payment Info */}
            <div className="bg-gray-50 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>

              {/* M-Pesa Number */}
              <div className="mb-4">
                <label
                  htmlFor="mpesa-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  M-Pesa Number
                </label>
                <input
                  id="mpesa-number"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  type="text"
                  placeholder="Enter your M-Pesa number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Delivery Point */}
              <div className="mb-4">
                <label
                  htmlFor="delivery-point"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Point
                </label>
                <input
                  id="delivery-point"
                  value={deliveryPoint}
                  onChange={(e) => setDeliveryPoint(e.target.value)}
                  type="text"
                  placeholder="Enter your delivery point"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Payment Status and ClipLoader */}
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color="#00bfff" loading={isLoading} size={24} />
                </div>
              ) : (
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-green-700"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </button>
              )}
              <p className="text-sm mt-4 text-center">{paymentStatus}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
