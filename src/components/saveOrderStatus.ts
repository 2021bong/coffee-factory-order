import axios from 'axios';

const getOrderStatus = async () => {
  const status = await axios.get(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string);
  const order = status.data.order;
  return order;
};
const setOrderStatus = async (newOrder: boolean) => {
  axios.put(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string, { order: newOrder });
};

export { getOrderStatus, setOrderStatus };
