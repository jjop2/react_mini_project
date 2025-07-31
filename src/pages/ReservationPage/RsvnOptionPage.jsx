import { useEffect, useState } from 'react'
import './RsvnOptionPage.css'
import NowInfoDefault from '../../component/ReservationComponent/RsvnNowInfo/NowInfoDefault';
import RsvnOption from '../../component/ReservationComponent/RsvnOption/RsvnOption';

function RsvnOptionPage({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  const preURL = '/reservation/room';
  const nextURL = '/reservation/payment';

  return (
    <div className='rsvnOptionPage'>
      <div className="rsvnWrap2">
        
        <div className="roomLayout-left">
          {/* 옵션 선택 본문 */}
          <RsvnOption
            rsvnInfo={rsvnInfo}
            setRsvnInfo={setRsvnInfo}
            totalGuestCount={totalGuestCount}
          />
        </div>

        <div className="roomLayout-right">
          {/* 예약 선택 현황 */}
          <NowInfoDefault
            rsvnInfo={rsvnInfo}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            preURL={preURL}
            nextURL={nextURL}
          />
        </div>

      </div>
    </div>
  )
}

export default RsvnOptionPage