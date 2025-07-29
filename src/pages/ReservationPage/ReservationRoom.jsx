import { useState } from 'react';
import './ReservationRoom.css'
import { useNavigate } from 'react-router-dom';

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, roomData, packData}) {
  const navigate = useNavigate();
  // 패키지/객실 탭
  const [isRoom, setIsRoom] = useState(false);
  
  // 패키지 목록 틀
  function packCard(pack) {
    return (
      <div className="packCard">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${pack.title}.png`} alt="" />
        <div className="packInfo">
          <h2>{pack.title}</h2>
          <p>{`객실 유형 : ${pack.roomType}`}</p>
          {
            pack.benefit.map((benefitContent, i)=>{
              return (
                <div key={i}>
                  <p>- {benefitContent}</p>
                </div>
              )
            })
          }
          <h3>{pack.price}</h3>
        </div>
        <div className="selectBtn" onClick={()=>{
          setRsvnInfo(obj => ({
            ...obj,
            selectedProduct: {
              type: 'package',
              name: pack.title
            }
          }));
          navigate('/reservation/option');
        }}>선택하기 &gt;</div>
      </div>
    )
  }

  // 객실 목록 틀
  function roomCard(room) {
    return (
      <div className="roomCard">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${room.name}.png`} alt="" />
        <div className="roomInfo">
          <h2>{room.name}</h2>
          <p>{`${room.bed} | ${room.size}`}</p>
          <h3>{room.price}</h3>
        </div>
        <div className="selectBtn" onClick={()=>{
          setRsvnInfo(obj => ({
            ...obj,
            selectedProduct: {
              type: 'room',
              name: room.name
            }
          }));
          navigate('/reservation/option');
        }}>선택하기 &gt;</div>
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

      {/* 패키지/객실 탭 메뉴 */}
      <div className="tab">
        <div className={`tabBtn ${isRoom ? '' : 'tabBtnSelected'}`} id='package' onClick={()=>setIsRoom(false)}>패키지</div>
        <div className={`tabBtn ${isRoom ? 'tabBtnSelected' : ''}`} id='room' onClick={()=>{setIsRoom(true)}}>일반 객실</div>
      </div>

      {/* 패키지 목록 */}
      <div className={`packSelect ${isRoom ? 'hide' : ''}`}>
        {
          packData.map((data, i)=>{
            return (
              <div key={i} className={`${totalGuestCount>data.max ? 'hide' : ''}`}>
                {packCard(data)}
              </div>
            )
          })
        }
      </div>
      
      {/* 객실 목록 */}
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

    </div>
  )
}

export default ReservationRoom