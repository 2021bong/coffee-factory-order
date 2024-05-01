'use client';

import { ChangeEvent, useContext, useState } from 'react';

import beverageMenu from '@/components/beverageMenu';
import names from '@/components/names';
import SelectGroup from '@/components/SelectGroup';
import styles from '@/components/styles/orderModal.module.css';
import saveDataServer from '@/components/server/saveDataServer';
import { ModalContext } from '../types/contextType';
import { useRouter } from 'next/navigation';
import { CategoryType } from '@/types/utilType';

export default function OrderModal() {
  const { show, closeModal } = useContext(ModalContext);
  const router = useRouter();
  const [name, setName] = useState(names[0]);
  const [beverages, setBeverages] = useState<CategoryType[]>(beverageMenu);
  const [etcBever, setEtcBever] = useState('');
  const [beverType, setBeverType] = useState(false);
  const selectedBever = beverages
    .map((bever) => bever.drink)
    .flat()
    .filter((item) => item.selected)[0].name;

  const handleSelectName = (e: ChangeEvent<HTMLSelectElement>) => {
    setName(e.target.value);
  };

  const handleSelectBever = (e: ChangeEvent<HTMLSelectElement>) => {
    const updateBeverages = beverages.map((drinkGroup) => {
      const { drinkType, drink } = drinkGroup;
      const newDrink = drink.map((menu) =>
        menu.name === e.target.value ? { ...menu, selected: true } : { ...menu, selected: false },
      );
      const newCategory = { drinkType, drink: newDrink };
      return newCategory;
    });
    setBeverages(updateBeverages);
  };

  const finalBever = selectedBever !== '기타' ? selectedBever : etcBever;
  const itsOkay = finalBever === '괜찮습니다';

  const confirmOrder = async () => {
    // 선택한 음료가 기타일 때 빈칸 제출 불허
    if (finalBever === '') {
      alert('기타 음료 이름을 적어주세요!');
      return;
    }
    if (confirm(`${name}님, ${finalBever}${itsOkay ? '' : '_' + (beverType ? '핫' : '아이스')} 맞으신가요?`)) {
      saveOrder();
    }
  };

  const saveOrder = async () => {
    // 괜찮습니다 일 때는 온도 저장하지않음
    if (itsOkay) {
      localStorage.setItem('order', JSON.stringify({ name, bever: finalBever, type: '' }));
    } else {
      localStorage.setItem('order', JSON.stringify({ name, bever: finalBever, type: beverType }));
    }
    localStorage.setItem('date', JSON.stringify(new Date()));
    await saveDataServer({ name, bever: finalBever, type: beverType });
    closeModal();
  };
  return (
    show && (
      <div className={styles.modal_container}>
        <div className={styles.modal}>
          <h3 className='title'>주문 하기</h3>
          <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <div className={styles.input_box1}>
              <label htmlFor='name' className={styles.label} aria-label='user-name'>
                이름
              </label>
              <select name='name' id='name' defaultValue={names[0]} onChange={handleSelectName}>
                {names.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </div>
            <div className={styles.input_box1}>
              <label htmlFor='beverage' aria-label='beverage'>
                음료
              </label>
              <select name='beverage' id='beverage' defaultValue={'오늘의커피'} onChange={handleSelectBever}>
                {beverages?.map((drinkGroup) => (
                  <SelectGroup category={drinkGroup} key={drinkGroup.drinkType} />
                ))}
              </select>
            </div>
            <div className={styles.input_box1}>
              <label htmlFor='etc' aria-label='etc-beverage-memo'>
                기타 음료
              </label>
              <input
                type='text'
                disabled={selectedBever !== '기타'}
                placeholder={selectedBever !== '기타' ? ' - ' : '메뉴 이름을 적어주세요.'}
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
                onChange={() => setBeverType(false)}
              />
              <label htmlFor='ice' aria-label='ice'>
                아이스
              </label>
              <input type='radio' value='따뜻하게' id='hot' name='temperature' onChange={() => setBeverType(true)} />
              <label htmlFor='hot' aria-label='hot'>
                따뜻하게
              </label>
            </fieldset>
            <button onClick={confirmOrder} className='button mr5' type='button' aria-label='complete'>
              주문 완료
            </button>
            <button onClick={closeModal} className='button' type='button' aria-label='close'>
              닫기
            </button>
          </form>
        </div>
      </div>
    )
  );
}
