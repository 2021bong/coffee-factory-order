import { OrderDataType } from '@/app/page';
import styles from '@/components/styles/mode.module.css';

export default function OrderModeList({ orderData }: { orderData: OrderDataType | undefined }) {
  const getTotal = (inIsOkay: boolean) => {
    const total =
      orderData?.reduce((acc, cur) => {
        acc += cur[1][0].length + cur[1][1].length;
        return acc;
      }, 0) || 0;
    const isOkay = orderData?.filter((order) => order[0] === '괜찮습니다').flat()[1];
    const isOKayLength = isOkay ? isOkay[0].length + isOkay[1].length : 0;
    return inIsOkay ? total : total - isOKayLength;
  };
  return (
    <>
      <ul>
        {orderData?.map(([beverName, beverType]) => {
          return (beverType[0].length || beverType[1].length) && beverName !== '괜찮습니다' ? (
            <li key={beverName + beverType[0] + beverType[1]} className={styles.beverage}>
              <p className={styles.bever_name}>{beverName}</p> <p className={styles.ice}>아 : {beverType[0].length}</p>
              <p className={styles.hot}>따 : {beverType[1].length}</p>
            </li>
          ) : null;
        })}
        {orderData
          ?.filter(([beverName, beverType]) => beverName === '괜찮습니다')
          ?.map((item) => {
            return item[1][0].length ? (
              <li key={item[0]} className={styles.beverage}>
                <p className={styles.bever_name}>{item[0]}</p>
                <p className={styles.ice}>{item[1][0].length}</p>
              </li>
            ) : null;
          })}
      </ul>
      <p className={styles.total}>
        총 음료 개수 : <span className={styles.total_number}>{getTotal(false)}</span>
      </p>
      <p className={styles.total}>
        주문자(괜찮습니다 포함) : <span className={styles.total_number}>{getTotal(true)}</span> / 15
      </p>
    </>
  );
}
