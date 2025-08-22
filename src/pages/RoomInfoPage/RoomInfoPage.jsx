import { useState } from 'react'
import './RoomInfoPage.css'
import RoomInfo from '../../component/RoomInfo/RoomInfo';

function RoomInfoPage({roomData}) {
  const [showStandard, setShowStandard] = useState(true);
  const [showDeluxe, setShowDeluxe] = useState(false);
  const [showSuite, setShowSuite] = useState(false);


  return (
    <div className="roomInfoPage">
      <div className="pageWrap">

        <div className="pageTitle">
          <h2>객실</h2>
        </div>

        <div className="pageBody">
          {/* 객실 유형 탭 메뉴 */}
          <div className="tab">
            <div className={`tabBtn ${showStandard ? 'tabBtnSelected' : ''}`} id='room' onClick={()=>{
              setShowStandard(true);
              setShowDeluxe(false);
              setShowSuite(false);
              }}>스탠다드</div>
            <div className={`tabBtn ${showDeluxe ? 'tabBtnSelected' : ''}`} id='package' onClick={()=>{
              setShowStandard(false);
              setShowDeluxe(true);
              setShowSuite(false);
              }}>디럭스</div>
            <div className={`tabBtn ${showSuite ? 'tabBtnSelected' : ''}`} id='package' onClick={()=>{
              setShowStandard(false);
              setShowDeluxe(false);
              setShowSuite(true);
              }}>스위트</div>
          </div>

          {/* 객실 정보 본문 */}
          <RoomInfo
            roomData={roomData}
            showStandard={showStandard}
            showDeluxe={showDeluxe}
            showSuite={showSuite}
          />
        </div>
        
      </div>
    </div>
  )
}

export default RoomInfoPage