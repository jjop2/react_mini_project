import { useState } from 'react';
import './ReservationRoom.css'

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate}) {
  // rsvnInfo 구조분해
  const {startDate, endDate, adultCount, childCount} = rsvnInfo;

  // 객실/패키지 탭
  const [isRoom, setIsRoom] = useState(true);

  return (
    <div className="reservationRoom">

      {/* 예약 선택 현황 */}
      <div className="rsvnInfoNow">
        <div>
          <p>날짜</p>
          <p>{`${checkInDate} ~ ${checkOutDate}`}</p>
        </div>
        <div>
          <p>인원</p>
          <p>{`성인 ${adultCount}, 어린이 ${childCount}`}</p>
        </div>
      </div>

      <div className="tab">
        <div className={`tabBtn ${isRoom ? 'tabBtnSelected' : ''}`} id='room' onClick={()=>{setIsRoom(true)}}>일반 객실</div>
        <div className={`tabBtn ${isRoom ? '' : 'tabBtnSelected'}`} id='package' onClick={()=>setIsRoom(false)}>패키지</div>
      </div>

      <div className={`roomSelect ${isRoom ? '' : 'hide'}`}>
        room
      </div>
      <div className={`packageSelect ${isRoom ? 'hide' : ''}`}>
        package
      </div>

    </div>
  )
}

export default ReservationRoom