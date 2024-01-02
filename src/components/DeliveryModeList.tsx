import { OrderDataType } from '@/app/page';
import styles from '@/components/styles/mode.module.css';
import classNames from 'classnames';

export default function DeliveryModeList({ orderData }: { orderData: OrderDataType | undefined }) {
  return (
    <ul>
      {orderData?.map(([beverName, beverType]) => {
        const [iceBever, hotBever] = beverType;
        return (iceBever.length || hotBever.length) && beverName !== '괜찮습니다' ? (
          <li key={beverName} className={styles.beverage}>
            <p className={styles.bever_name}>{beverName}</p>
            <OrderDetails orderNames={iceBever} mode='ice' />
            <OrderDetails orderNames={hotBever} mode='hot' />
          </li>
        ) : null;
      })}
    </ul>
  );
}

interface OrderDetailsType {
  orderNames: string[] | [];
  mode: 'hot' | 'ice';
}

const OrderDetails = ({ orderNames, mode }: OrderDetailsType) => {
  return orderNames.length ? (
    <p className={classNames({ [styles.ice]: mode === 'ice' }, { [styles.hot]: mode === 'hot' })}>
      <span>{mode === 'ice' ? '아' : '따'}</span>
      <br />
      {orderNames.map((name) => (
        <span key={name}>
          {name}
          <br />
        </span>
      ))}
    </p>
  ) : null;
};
