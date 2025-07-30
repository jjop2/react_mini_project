import { useState } from 'react';
import './RsvnRoom.css'
import { useNavigate } from 'react-router-dom';
import NowInfoDefault from '../../component/ReservationComponent/RsvnNowInfo/NowInfoDefault';
import RsvnRoomList from '../../component/ReservationComponent/RsvnRoomList/RsvnRoomList';

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, roomData, packData}) {
  const preURL = '/reservation';
  const nextURL = '/reservation/option';
  

  return (
    <div className="rsvnRoom">
      <div className="rsvnWrap2">

        <div className="roomLayout-left">
          {/* 패키지, 객실 목록 */}
          <RsvnRoomList
            setRsvnInfo={setRsvnInfo}
            totalGuestCount={totalGuestCount}
            roomData={roomData}
            packData={packData}
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

export default ReservationRoom