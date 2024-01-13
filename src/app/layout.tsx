'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <meta
          property='og:image'
          content='https://github.com/2021bong/coffee-factory-order/assets/49029756/c89aa253-7d2f-494a-a435-c56349df12d0'
        />
      </Head>
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
