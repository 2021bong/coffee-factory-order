'use client';

import { ChangeEvent, useContext, useState } from 'react';

import beverageMenu from '@/components/beverageMenu';
import names from '@/components/name';
import SelectGroup from '@/components/SelectGroup';
import { CategoryType, BeverStateType, CateType } from '@/types/beverageType';
import styles from '@/components/styles/orderModal.module.css';
import saveJsonServer from '@/components/saveJsonServer';
import { ModalContext } from './ModalContext';
import { useRouter } from 'next/navigation';

export default function OrderModal() {
  const { show, closeModal } = useContext(ModalContext);
  const router = useRouter();
  const [name, setName] = useState(names[0]);
  const [beverages, setBeverages] = useState<CategoryType[]>(beverageMenu);
  const [etcBever, setEtcBever] = useState('');
  const [beverType, setBeverType] = useState('아이스');
  const selectedBever = beverages
    .map((cate) => Object.values(cate)[0])
    .flat()
    .filter((item) => item.selected)[0].name;

  const handleSelectName = (e: ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };

  const handleSelectBever = (e: ChangeEvent<HTMLSelectElement>) => {
    const updateBeverages = beverages.map((category) => {
      const [cate, items] = Object.entries(category)[0] as [CateType, BeverStateType[]];
      const newItems = items.map((menu) =>
        menu.name === e.target.value ? { ...menu, selected: true } : { ...menu, selected: false },
      );
      const newCategory = { [cate]: newItems };
      return newCategory;
    });
    setBeverages(updateBeverages as CategoryType[]);
  };

  const handleBeverType = (e: ChangeEvent<HTMLInputElement>) => {
    setBeverType(e.target.value);
  };

  const finalBever = selectedBever !== '기타' ? selectedBever : etcBever;
  const itsOkay = finalBever === '괜찮습니다';
  const onComplete = async () => {
    if (confirm(`${name}님, ${finalBever}${itsOkay ? '' : '_' + beverType} 맞으신가요?`)) {
      // 괜찮습니다 일 때는 온도 저장하지않음
      if (itsOkay) {
        localStorage.setItem('order', JSON.stringify({ name, finalBever, beverType: '' }));
      } else {
        localStorage.setItem('order', JSON.stringify({ name, finalBever, beverType }));
      }
      localStorage.setItem('date', JSON.stringify(new Date()));
      await saveJsonServer({ name, bever: finalBever, type: beverType });
      alert('주문 완료 되었습니다.');
      router.push('/');
      closeModal();
    }
  };
  return (
    show && (
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <h3 className='title'>주문 하기</h3>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <div className={styles.input_box1}>
              <label htmlFor='name' className={styles.label}>
                이름
              </label>
              <select name='name' id='name' defaultValue={names[0]} onChange={handleSelectName}>
                {names.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className={styles.input_box1}>
              <label htmlFor='beverage'>음료</label>
              <select name='beverage' id='beverage' defaultValue={'오늘의커피'} onChange={handleSelectBever}>
                {beverages?.map((type) => (
                  <SelectGroup category={type} key={Object.keys(type)[0]} />
                ))}
              </select>
            </div>
            <div className={styles.input_box1}>
              <label htmlFor='etc'>기타 음료</label>
              <input
                type='text'
                disabled={selectedBever !== '기타'}
                placeholder='메뉴 이름을 적어주세요.'
                value={etcBever}
                onChange={(e) => setEtcBever(e.target.value)}
              />
            </div>
            <fieldset className={styles.input_box2}>
              <legend>음료 온도</legend>
              <input
                type='radio'
                value='아이스'
                id='ice'
                name='temperature'
                defaultChecked
                onChange={handleBeverType}
              />
              <label htmlFor='ice'>아이스</label>
              <input type='radio' value='따뜻하게' id='hot' name='temperature' onChange={handleBeverType} />
              <label htmlFor='hot'>따뜻하게</label>
            </fieldset>
            <button onClick={onComplete} className={styles.button} type='button'>
              주문 완료
            </button>
            <button onClick={closeModal} className={styles.button} type='button'>
              닫기
            </button>
          </form>
        </div>
      </div>
    )
  );
}
