import { useEffect, useState, useContext } from 'react';
import { ModalContext } from './ModalContext';
import { setOrderStatus } from './saveOrderStatus';
import dayjs, { Dayjs } from 'dayjs';
interface TimeData {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}
export default function OrderStartBtn() {
  const { setDisableOrder } = useContext(ModalContext);
  const MINS = 10;
  const SECS = 60;
  const [timeData, setTimeData] = useState<TimeData>({
    startTime: null,
    endTime: null,
  });
  const [countdown, setCountdown] = useState(false);
  const [minuets, setMinuets] = useState(MINS * SECS * 1000);

  // 스토리지에서 시작시간, 마감시간, 카운트를 가져와서 state로 세팅
  useEffect(() => {
    const storageStartTime = window?.localStorage.getItem('startTime');
    const storageEndTime = window?.localStorage.getItem('endTime');
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
    const storageCountTime = window?.localStorage.getItem('count');
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
        window?.localStorage.setItem('count', minuets.toString());
      }
    }, 1000);
    if (minuets <= 0) {
      clearTimeout(countTime);
      setDisableOrder();
      window?.localStorage.removeItem('count');
      window?.localStorage.removeItem('startTime');
      window?.localStorage.removeItem('endTime');
      setOrderStatus(false); // 서버에 주문 가능 false로 set
    }
    return () => {
      clearTimeout(countTime);
    };
  });

  // 카운트 세기 시작
  const handleCountdown = () => {
    let { startTime, endTime } = timeData;
    startTime = dayjs(new Date());
    endTime = startTime.add(MINS, 'minute');
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

  const makeShowText = (restTime: number) => {
    return restTime > 6000 ? Math.floor(restTime / (60 * 1000)) + '분' : restTime / 1000 + '초';
  };

  return countdown ? (
    <div className='time_count'>
      <p className='time_data'>
        시작 시간 : <span>{timeData.startTime?.format('HH:mm')}</span>
      </p>
      <p className='time_data'>
        마감 시간 : <span>{timeData.endTime?.format('HH:mm')}</span>
      </p>
      <p className={'ordering' + `${minuets < 60000 ? ' last_min' : ''}`}>{`남은 시간 : ${makeShowText(minuets)}`}</p>
    </div>
  ) : (
    <button className={'order_btn'} onClick={handleCountdown}>
      주문 시작
    </button>
  );
}
