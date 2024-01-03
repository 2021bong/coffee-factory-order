import axios from 'axios';

// 타이머 이후 주문 가능 여부 값 설정
const getOrderStatus = async (): Promise<boolean> => {
  const statusData = await axios.get(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string);
  const status = statusData.data.status;
  return status;
};
const setOrderStatus = async (newStatus: boolean): Promise<void> => {
  axios.put(process.env.NEXT_PUBLIC_JSON_SERVER_ORDER_IP as string, { status: newStatus });
};

export { getOrderStatus, setOrderStatus };
