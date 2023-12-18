import axios from 'axios';

interface OrderType {
  name: string;
  bever: string;
  type: string;
}

const saveJsonServer = async (order: OrderType) => {
  const { name, bever, type } = order;
  const originalData = await axios.get(process.env.NEXT_PUBLIC_JSON_SERVER_IP as string).then((data) => data.data);
  const hadBever = !!originalData[bever];
  const newData = { ...originalData };
  const orderKeys = Object.keys(newData);
  orderKeys.forEach((key) => {
    const [ice, hot] = newData[key];
    let newList = [];
    if (ice.includes(name) || hot.includes(name)) {
      ice.includes(name) ? newList.push(ice.filter((n: string) => n !== name)) : newList.push(ice);
      hot.includes(name) ? newList.push(hot.filter((n: string) => n !== name)) : newList.push(hot);
      newData[key] = newList;
    }
  });
  if (!hadBever) {
    newData[bever] = [[], []];
  }
  if (type === '아이스') {
    newData[bever][0].push(name);
  } else {
    newData[bever][1].push(name);
  }
  axios.put(process.env.NEXT_PUBLIC_JSON_SERVER_IP as string, newData);
};

export default saveJsonServer;
