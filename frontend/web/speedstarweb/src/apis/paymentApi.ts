import axios from "axios";

const API_BASE_URL = "https://your-backend-api.com";  // Replace with your backend URL

export const initiatePayment = async (paymentData: {
  amount: number;
  mpesaNumber: string;
  email: string;
  deliveryPoint: string;
}) => {
  try {
    // Send the payment initiation request to the backend
    const response = await axios.post(`${API_BASE_URL}/payments/initiate`, {
      amount: paymentData.amount,
      mpesaNumber: paymentData.mpesaNumber,
      email: paymentData.email,
      deliveryPoint: paymentData.deliveryPoint,
    });

    // Handle the response and return the result
    return response.data;  // Assuming response contains { status: "success", transactionId: "xxxx" }
  } catch (error) {
    // Handle error (log, alert, etc.)
    console.error("Error initiating payment:", error);
    throw error;
  }
};

export const confirmPayment = async (transactionId: string) => {
  try {
    // Send the confirmation request to the backend
    const response = await axios.get(`${API_BASE_URL}/payments/confirm`, {
      params: { transactionId },
    });

    // Handle the response and return the result
    return response.data;  // Assuming response contains { status: "confirmed" }
  } catch (error) {
    // Handle error (log, alert, etc.)
    console.error("Error confirming payment:", error);
    throw error;
  }
};

export const sendCartToBackend = async (cartData: {
    cart: Array<{
      mealId: number;
      quantity: number;
      price: number;
      deliveryFee: number;
    }>;
    mpesaNumber: string;
    email: string;
    deliveryPoint: string;
  }) => {
    try {
      const response = await fetch('https://your-backend-api-url.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send cart data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error sending cart data:', error);
      throw error;
    }
  };
