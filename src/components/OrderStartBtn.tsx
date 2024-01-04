import { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../types/contextType';
import { setOrderStatus } from './server/saveOrderStatus';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';

export interface TimeType {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

export default function OrderStartBtn() {
  const { setDisableOrder } = useContext(ModalContext);
  const MINS_PER_COUNT = 2;
  const SECS_PER_COUNT = 60;
  const localStorage = window?.localStorage;
  const [timeData, setTimeData] = useState<TimeType>({
    startTime: null,
    endTime: null,
  });
  const [countdown, setCountdown] = useState(false);
  const [minuets, setMinuets] = useState(MINS_PER_COUNT * SECS_PER_COUNT * 1000);

  // 스토리지에서 시작시간, 마감시간, 카운트를 가져와서 state로 세팅
  useEffect(() => {
    const storageStartTime = localStorage.getItem('startTime');
    const storageEndTime = localStorage.getItem('endTime');
    if (storageStartTime && storageEndTime) {
      const [startH, startM] = storageStartTime.split(':');
      const [endH, endM] = storageEndTime.split(':');
      setTimeData((prev) => {
        const newTimeData = { ...prev };
        newTimeData.startTime = dayjs().hour(+startH).minute(+startM);
        newTimeData.endTime = dayjs().hour(+endH).minute(+endM);
        return newTimeData;
      });
    }
    const storageCountTime = localStorage.getItem('count');
    if (storageCountTime) {
      setMinuets(JSON.parse(storageCountTime) * 1);
      setCountdown(true);
    }
  }, []);

  // 1초마다 로컬스토리지에 카운트시간 저장, 카운트가 0이 되면 이번 회차에 사용했던 데이터 모두 삭제 및 서버 마감 처리
  useEffect(() => {
    const countTime = setTimeout(() => {
      if (countdown) {
        setMinuets((prev) => prev - 1000);
        localStorage.setItem('count', minuets.toString());
      }
    }, 1000);
    if (minuets <= 0) {
      clearTimeout(countTime);
      setDisableOrder();
      localStorage.removeItem('count');
      localStorage.removeItem('startTime');
      localStorage.removeItem('endTime');
      setOrderStatus(); // 서버에 주문 가능 false로 set
    }
    return () => {
      clearTimeout(countTime);
    };
  });

  // 카운트 세기 시작
  const handleCountdown = () => {
    let { startTime, endTime } = timeData;
    startTime = dayjs(new Date());
    endTime = startTime.add(MINS_PER_COUNT, 'minute');
    if (!localStorage.getItem('startTime') && !localStorage.getItem('endTime')) {
      // 저장된 시간 없을 때만 set
      localStorage.setItem('startTime', startTime.format('HH:mm'));
      localStorage.setItem('endTime', endTime.format('HH:mm'));
      setTimeData((prev) => {
        const newTimeData = { ...prev };
        newTimeData.startTime = startTime;
        newTimeData.endTime = endTime;
        return newTimeData;
      });
    }
    setCountdown(true);
  };

  // 보여지는 시간 텍스트에 대한 설정 : 1분보다 크면 분단위, 작으면 초단위
  const makeShowText = (restTime: number) => {
    return restTime > 60000 ? Math.floor(restTime / (60 * 1000)) + '분' : restTime / 1000 + '초';
  };

  return countdown ? (
    <div className='time_count'>
      <p className='time_data'>
        시작 시간 : <span>{timeData.startTime?.format('HH:mm')}</span>
      </p>
      <p className='time_data'>
        마감 시간 : <span>{timeData.endTime?.format('HH:mm')}</span>
      </p>
      <p className={classNames('ordering', { last_min: minuets < 60000 })}>{`남은 시간 : ${makeShowText(minuets)}`}</p>
    </div>
  ) : (
    <button className={'order_btn'} onClick={handleCountdown}>
      주문 시작
    </button>
  );
}
