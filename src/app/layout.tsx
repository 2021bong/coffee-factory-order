'use client';

import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import './globals.css';
import './reset.css';
import nextSvg from '../../public/next.svg';
import NavBar from '@/components/NavBar';
import { ModalContext } from '@/types/contextType';
import OrderStartBtn from '@/components/OrderStartBtn';
import { getOrderStatus } from '@/components/server/saveOrderStatus';

// export const metadata: Metadata = {
//   title: '커공주',
//   description: '커피 공장 주문 받습니다',
//   keywords: ['study', 'test', 'cna'],
//   metadataBase: new URL('http://localhost:3000'),
//   openGraph: {
//     type: 'website',
//     url: 'http://localhost:3000',
//     title: 'My Website',
//     description: 'My Website Description',
//     siteName: 'My Website',
//     images: [
//       {
//         url: 'http://localhost:3000',
//         width: 1800,
//         height: 1600,
//         alt: 'My custom alt',
//       },
//     ],
//     locale: 'ko_KR',
//   },
//   icons: [{ rel: 'icon', url: nextSvg }],
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [orderableStatus, setOrderableStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOrderStatus().then((orderStatus) => {
      setOrderableStatus(orderStatus);
      setLoading(false);
    });
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
              {orderableStatus ? <OrderStartBtn /> : null}
              <div>{children}</div>
            </>
          )}
        </ModalContext.Provider>
      </body>
    </html>
  );
}
