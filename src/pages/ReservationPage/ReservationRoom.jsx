import { useState } from 'react';
import './ReservationRoom.css'

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, roomData, eventData}) {
  // 객실/패키지 탭
  const [isRoom, setIsRoom] = useState(true);

  function roomCard(room) {
    return (
      <div className="roomCard">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${room.name}.png`} alt="" />
        <div className="roomInfo">
          <h2>{room.name}</h2>
          <p>{`${room.bed} | ${room.size}`}</p>
          <h3>{room.price}</h3>
        </div>
        <div className="selectBtn">선택하기 &gt;</div>
      </div>
    )
  }

  function packageCard(event) {
    return (
      <div className="packageCard">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${event.title}.png`} alt="" />
        <div className="packageInfo">
          <h2>{event.title}</h2>
          <p>혜택</p>
          <h3>가격</h3>
        </div>
        <div className="selectBtn">선택하기 &gt;</div>
      </div>
    )
  }

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
          <p>{`성인 ${rsvnInfo.adultCount}, 어린이 ${rsvnInfo.childCount}`}</p>
        </div>
      </div>

      <div className="tab">
        <div className={`tabBtn ${isRoom ? 'tabBtnSelected' : ''}`} id='room' onClick={()=>{setIsRoom(true)}}>일반 객실</div>
        <div className={`tabBtn ${isRoom ? '' : 'tabBtnSelected'}`} id='package' onClick={()=>setIsRoom(false)}>패키지</div>
      </div>

      <div className={`roomSelect ${isRoom ? '' : 'hide'}`}>
        {
          roomData.map((data, i)=>{
            return (
              <div key={i} className={`${totalGuestCount>data.max ? 'hide' : ''}`}>
                {roomCard(data)}
              </div>
            )
          })
        }
      </div>
      <div className={`packageSelect ${isRoom ? 'hide' : ''}`}>
        {
          eventData.map((data, i)=>{
            return (
              <div key={i} className={``}>
                {packageCard(data)}
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default ReservationRoom