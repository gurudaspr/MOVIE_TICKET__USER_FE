import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import toast from 'react-hot-toast';

export const createOrder = async (amount,selectedSeats,showId) => {
  const response = await axios.post(`${baseUrl}/api/user/create-order`, {amount, selectedSeats,showId}, { withCredentials: true });
  console.log(response.data.order, 'order');
  return response.data.order;
  
};

export const handlePayment = async (order, callback) => {
  const response = await axios.get(`${baseUrl}/api/user/get-user`, { withCredentials: true });
  const userData = response.data;
  

  const options = {
    
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Filmgoo',
    description: 'Seat Booking',
    order_id: order.id,
    handler: function (response) {
      if (response.error) {
        toast.error(response.error.description);
      } else {
        callback(response.razorpay_payment_id,response.razorpay_signature);
      }
    },
    prefill: {
      name: userData.name,
      email:  userData.email,
      contact: ''
    },
    notes: {
      customer_name: userData.name,
    },
    theme: {
      color: '#f43f5e'
    }
  };
  console.log(options, 'options');

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};