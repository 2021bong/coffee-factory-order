'use client';

import { useContext, useEffect, useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';
import OrderModeList from '@/components/OrderModeList';
import DeliveryModeList from '@/components/DeliveryModeList';
import OrderModal from '@/components/OrderModal';
import { ModalContext } from '@/types/contextType';
import { ALL_URL } from '@/components/url';

export type OrderDataType = [string, [string[] | [], string[] | []]][];

export default function Home() {
  const { show, openModal, orderableStatus } = useContext(ModalContext);

  const [orderData, setOrderData] = useState<OrderDataType>();
  const [mode, setMode] = useState(true);

  useEffect(() => {
    axios
      .get(ALL_URL)
      .then((data) => {
        setOrderData(Object.entries(data.data));
      })
      .catch((err) => {
        console.error('error : ', err);
        alert('에러가 발생했습니다.');
      });
  }, [show]);

  return (
    <div className='container'>
      <p className={styles.mode_desc}>{mode ? '현재 결제 모드입니다.' : '현재 배달 모드입니다.'}</p>
      {!orderableStatus ? <h1 className='title'>마감합니다.</h1> : <h1 className='title'>커피 공장 주문 받습니다.</h1>}
      {orderableStatus && (
        <button onClick={openModal} className={styles.button}>
          주문 하기
        </button>
      )}
      {mode ? <OrderModeList orderData={orderData} /> : <DeliveryModeList orderData={orderData} />}
      <button className={styles.mode_btn} onClick={(e) => setMode((prev) => !prev)}>
        {mode ? '배달 모드' : '결제 모드'}
      </button>
      {show && <OrderModal />}
    </div>
  );
}
