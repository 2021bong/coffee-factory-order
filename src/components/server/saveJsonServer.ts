import axios from 'axios';
import { OrderType } from '@/types/utilType';

const saveJsonServer = async (order: OrderType) => {
  const { name, bever, type } = order; // { 'wh bong', '아메리카노', '아이스' }
  // 저장된 전체 주문 내역 데이터 불러오기
  const originalData = await axios.get(process.env.NEXT_PUBLIC_JSON_SERVER_IP as string).then((data) => data.data);
  const hadBever = !!originalData[bever];
  const newData = { ...originalData };
  const orderKeys = Object.keys(newData); // orderKeys = [오늘의 커피, 아메리카노, ...]
  orderKeys.forEach((key) => {
    const [ice, hot] = newData[key];
    let newList = [];
    // 이름을 확인해 이미 주문한 내역이 있으면 지움
    if (ice.includes(name) || hot.includes(name)) {
      ice.includes(name) ? newList.push(ice.filter((n: string) => n !== name)) : newList.push(ice);
      hot.includes(name) ? newList.push(hot.filter((n: string) => n !== name)) : newList.push(hot);
      newData[key] = newList;
    }
  });
  // 음료가 주문 내역에 없을 때 음료 추가
  if (!hadBever) {
    newData[bever] = [[], []];
  }
  // 주문자 이름 추가
  const [ice, hot] = newData[bever];
  if (type === '아이스') {
    ice.push(name);
  } else {
    hot.push(name);
  }
  // 서버에 저장
  axios.put(process.env.NEXT_PUBLIC_JSON_SERVER_IP as string, newData);
};

export default saveJsonServer;
