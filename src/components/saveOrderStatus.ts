import axios from 'axios';

// 타이머 이후 주문 가능 여부 값 설정
const getOrderStatus = async (): Promise<boolean> => {
  const status = await axios.get(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string);
  const order = status.data.order;
  return order;
};
const setOrderStatus = async (newOrder: boolean): Promise<void> => {
  axios.put(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string, { order: newOrder });
};

export { getOrderStatus, setOrderStatus };
