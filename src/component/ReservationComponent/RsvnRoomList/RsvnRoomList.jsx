import { useNavigate } from 'react-router-dom';
import './RsvnRoomList.css'
import { useState } from 'react';

function RsvnRoomList({setRsvnInfo, totalGuestCount, roomData, packData}) {
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
      <div className="cardBox">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${pack.title}.png`} alt="" />
        <div className="cardInfo">
          <div className='cardInfo-top'>
            <h2>{pack.title}</h2>
            <p>{`객실 유형 : ${pack.roomType}`}</p>
            <p className='summaryBenefit'>{pack.summaryBenefit}</p>
          </div>
          <div className='cardInfo-bottom'>
            <h3>{`${formatPrice(pack.price)}원`}</h3>
          </div>
        </div>
        <div className="selectBtnBox">
          <div className="selectBtn" onClick={()=>{
            updateInfo('selectedProduct', {
              type: 'package',
              name: pack.title,
              max: pack.max,
              price: pack.price
            });
            navigate('/reservation/option');
          }}>선택하기</div>
        </div>
      </div>
    )
  }

  // 객실 목록 틀
  function roomCard(room) {
    return (
      <div className="cardBox">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${room.name}.png`} alt="" />
        <div className="cardInfo">
          <div className="cardInfo-top">
            <h2>{room.name}</h2>
            <p>{`${room.bed} | ${room.size}`}</p>
          </div>
          <div className="cardInfo-bottom">
            <h3>{`${formatPrice(room.price)}원`}</h3>
          </div>
        </div>
        <div className="selectBtnBox">
          <div className="selectBtn" onClick={()=>{
            updateInfo('selectedProduct', {
              type: 'room',
              name: room.name,
              max: room.max,
              price:room.price
            });
            navigate('/reservation/option');
          }}>선택하기</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rsvnRoomInfo">
      <div className="roomListWrap">
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
    </div>
  )
}

export default RsvnRoomList