import { OrderDataType } from '@/app/page';
import styles from '@/components/styles/mode.module.css';

export default function DeliveryModeList({ orderData }: { orderData: OrderDataType | undefined }) {
  return (
    <ul>
      {orderData?.map(([beverName, beverType]) => {
        return (beverType[0].length || beverType[1].length) && beverName !== '괜찮습니다' ? (
          <li key={beverName as string} className={styles.beverage}>
            <p className={styles.bever_name}>{beverName}</p>{' '}
            <p className={styles.ice}>
              {
                // 괜찮습니다 때문에 분리
                beverType[0].length ? (
                  <>
                    <span>아</span>
                    <br />
                  </>
                ) : null
              }
              {beverType[0].length
                ? beverType[0].map((name) => (
                    <span key={name}>
                      {name}
                      <br />
                    </span>
                  ))
                : null}
            </p>
            <br />
            <p className={styles.hot}>
              {beverType[1].length ? (
                <>
                  <span>따</span>
                  <br />
                  {beverType[1].map((name) => (
                    <span key={name}>
                      {name}
                      <br />
                    </span>
                  ))}
                </>
              ) : null}
            </p>
          </li>
        ) : null;
      })}
    </ul>
  );
}
