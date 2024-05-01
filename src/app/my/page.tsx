'use client';

import { useContext, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styles from './page.module.css';
import { ModalContext } from '@/types/contextType';
import OrderModal from '@/components/OrderModal';
import { OrderType } from '@/types/utilType';
import classNames from 'classnames';

export default function MyOrder() {
  const { show, openModal, orderableStatus } = useContext(ModalContext);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const removeLastData = () => {
    if (confirm('저장된 주문 내역을 삭제하시겠습니까? \n* 주문과는 상관없이 저장된 내역만 지워집니다.')) {
      localStorage.removeItem('order');
      localStorage.removeItem('date');
      setOrder(null);
      setDate(null);
      alert('삭제되었습니다.');
    }
  };
  useEffect(() => {
    const storageOrder = window.localStorage.getItem('order');
    const storageDate = window.localStorage.getItem('date');
    if (storageOrder) setOrder(JSON.parse(storageOrder));
    if (storageDate) setDate(dayjs(JSON.parse(storageDate)));
  }, [show]);

  return (
    <div className='container'>
      <h3 className='title'>주문 내역</h3>
      {order ? (
        <>
          <p className={styles.content}>이름 : {order.name}</p>
          <p className={styles.content}>음료 : {order.bever}</p>
          <p className={styles.content}>음료 온도 : {order.type}</p>
          <p className={styles.content}>
            주문 날짜 : <b>{date?.format('YYYY-MM-DD')}</b>
          </p>
          <p className={styles.caution}>* 오늘 주문인지 날짜를 꼭 확인해주세요!</p>
        </>
      ) : (
        <p className={styles.content}>저장된 주문 내역이 없습니다.</p>
      )}
      {orderableStatus ? (
        <button className='button' onClick={openModal}>
          {order ? '주문 다시 하기' : '주문 하기'}
        </button>
      ) : (
        <button className={classNames('button', styles.end)} disabled={true}>
          주문 마감
        </button>
      )}
      <div>
        <button className={styles.remove_btn} onClick={removeLastData} disabled={!order}>
          주문 내역 지우기
        </button>
      </div>
      <OrderModal />
    </div>
  );
}
