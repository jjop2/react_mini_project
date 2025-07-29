import { useState } from 'react';
import './RsvnRoom.css'
import { useNavigate } from 'react-router-dom';
import NowInfoDefault from '../../component/NowInfo/NowInfoDefault';

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, roomData, packData}) {
  const navigate = useNavigate();
  // 패키지/객실 탭
  const [isRoom, setIsRoom] = useState(false);

  // 예약 정보 업데이트용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  }

  // 가격 세자리마다 콤마 함수
  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  
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
          <h3>{`${formatPrice(pack.price)}원`}</h3>
        </div>
        <div className="selectBtn" onClick={()=>{
          updateInfo('selectedProduct', {
            type: 'package',
            name: pack.title,
            max: pack.max,
            price: pack.price
          });
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
          <h3>{`${formatPrice(room.price)}원`}</h3>
        </div>
        <div className="selectBtn" onClick={()=>{
          updateInfo('selectedProduct', {
            type: 'room',
            name: room.name,
            max: room.max,
            price:room.price
          });
          navigate('/reservation/option');
        }}>선택하기 &gt;</div>
      </div>
    )
  }

  return (
    <div className="rsvnRoom">

      {/* 예약 선택 현황 */}
      <NowInfoDefault
        rsvnInfo={rsvnInfo}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />

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
      
      {/* 이동 버튼 */}
        <div className="preBtn" onClick={()=>navigate('/reservation')}>이전 &gt;</div>

    </div>
  )
}

export default ReservationRoom