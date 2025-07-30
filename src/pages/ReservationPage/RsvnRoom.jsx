import { useState } from 'react';
import './RsvnRoom.css'
import { useNavigate } from 'react-router-dom';
import NowInfoDefault from '../../component/rsvnNowInfo/NowInfoDefault';
import RsvnRoomList from '../../component/RsvnRoomList/RsvnRoomList';

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, roomData, packData}) {
  const navigate = useNavigate();

  // 패키지/객실 탭
  const [isRoom, setIsRoom] = useState(false);

  return (
    <div className="rsvnRoom">
      <div className="rsvnWrap2">

        {/* 예약 선택 현황 */}
        <NowInfoDefault
          rsvnInfo={rsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />

        <div className="roomLayout">
          {/* 패키지/객실 탭 메뉴 */}
          <div className="tab">
            <div className={`tabBtn ${isRoom ? '' : 'tabBtnSelected'}`} id='package' onClick={()=>setIsRoom(false)}>패키지</div>
            <div className={`tabBtn ${isRoom ? 'tabBtnSelected' : ''}`} id='room' onClick={()=>{setIsRoom(true)}}>일반 객실</div>
          </div>

          {/* 패키지, 객실 목록 */}
          <RsvnRoomList
            setRsvnInfo={setRsvnInfo}
            totalGuestCount={totalGuestCount}
            roomData={roomData}
            packData={packData}
            isRoom={isRoom}
          />
        </div>
        
        {/* 이동 버튼 */}
          <div className="preBtn" onClick={()=>navigate('/reservation')}>이전 &gt;</div>

      </div>
    </div>
  )
}

export default ReservationRoom