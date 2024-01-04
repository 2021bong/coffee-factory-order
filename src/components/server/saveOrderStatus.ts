import axios from 'axios';
import { STATUS_URL } from '../url';

// 타이머 이후 주문 가능 여부 값 설정
const getOrderStatus = async (): Promise<boolean> => {
  const statusData = await axios.get(STATUS_URL);
  const status = statusData.data.status;
  return status;
};
const setOrderStatus = async (): Promise<void> => {
  await axios.post(STATUS_URL);
};

export { getOrderStatus, setOrderStatus };
