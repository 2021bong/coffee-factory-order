'use client';

import { useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import './reset.css';
import NavBar from '@/components/NavBar';
import { ModalContext } from '@/types/contextType';
import OrderStartBtn from '@/components/OrderStartBtn';
import { getOrderStatus } from '@/components/server/saveOrderStatus';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [orderableStatus, setOrderableStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const orderStatus = await getOrderStatus();
      setOrderableStatus(orderStatus);
      setLoading(false);
    };

    fetchOrderStatus();
  }, []);

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  const setDisableOrder = () => {
    setOrderableStatus(false);
    closeModal();
  };

  return (
    <html lang='ko'>
      <head>
        <title>커공주</title>
        <meta property='og:title' content='커공주' />
        <meta property='og:url' content='https://coffee-factory-order.vercel.app/' />
        <meta
          property='og:image'
          content='https://github.com/2021bong/coffee-factory-order/assets/49029756/c89aa253-7d2f-494a-a435-c56349df12d0'
        />
        <meta property='og:title' content='커피 공장 주문 받습니다.' />
        <meta property='og:description' content='점심 시간 커피 주문을 편하게 하기 위한 커피 주문 취합 프로젝트' />
        <meta property='og:type' content='website' />
      </head>
      <body>
        <SpeedInsights />
        <ModalContext.Provider value={{ show, openModal, closeModal, orderableStatus, setDisableOrder }}>
          <NavBar />
          {loading ? (
            <div className='loading'>... Loading ...</div>
          ) : (
            <>
              {orderableStatus && <OrderStartBtn />}
              <div>{children}</div>
            </>
          )}
        </ModalContext.Provider>
      </body>
    </html>
  );
}
