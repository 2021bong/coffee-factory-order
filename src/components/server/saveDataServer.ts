import axios from 'axios';
import { OrderType } from '@/types/utilType';
import { ORDER_URL } from '../url';

const saveDataServer = async (order: OrderType) => {
  await axios
    .post(ORDER_URL, order)
    .then(() => alert('주문 완료 되었습니다.'))
    .catch((err) => alert('오류로 주문 실패하였습니다.'));
};

export default saveDataServer;
