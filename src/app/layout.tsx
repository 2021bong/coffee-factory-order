'use client';

import { useEffect, useState } from 'react';
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
      <body>
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
