import { useEffect, useState } from 'react'
import './RsvnOption.css'
import NowInfoDefault from '../../component/ReservationComponent/RsvnNowInfo/NowInfoDefault';
import RsvnOption from '../../component/ReservationComponent/RsvnOption/RsvnOption';

function ReservationOption({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  const preURL = '/reservation/room';
  const nextURL = '/reservation/payment';

  return (
    <div className='rsvnOption'>

      {/* 예약 선택 현황 */}
      <NowInfoDefault
        rsvnInfo={rsvnInfo}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        preURL={preURL}
        nextURL={nextURL}
      />
      
      {/* 옵션 선택 본문 */}
      <RsvnOption
        rsvnInfo={rsvnInfo}
        setRsvnInfo={setRsvnInfo}
        totalGuestCount={totalGuestCount}
      />
      
    </div>
  )
}

export default ReservationOption