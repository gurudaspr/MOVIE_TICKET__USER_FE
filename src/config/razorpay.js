import axios from 'axios';
import { baseUrl } from '../baseUrl/baseUrl';
import toast from 'react-hot-toast';

export const createOrder = async (amount) => {
  const response = await axios.post(`${baseUrl}/api/create-order`, { amount }, { withCredentials: true });
  console.log(response.data.order, 'order');
  return response.data.order;
  
};

export const handlePayment = (order, callback) => {
  

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
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '6282184257'
    },
    theme: {
      color: '#3399cc'
    }
  };
  console.log(options, 'options');

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};