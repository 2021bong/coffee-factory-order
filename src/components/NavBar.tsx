'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/components/styles/navbar.module.css';

export default function NavBar() {
  const paths = usePathname();
  const navMenu = [
    { id: 1, title: '주문 현황', url: '/' },
    { id: 2, title: '내 주문', url: '/my' },
  ];
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navMenu.map((menu) => {
          return (
            <Link href={menu.url} key={menu.id} className={`${styles.link} ${paths === menu.url && styles.selected}`}>
              <li>{menu.title}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
