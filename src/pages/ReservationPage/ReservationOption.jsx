import { useState } from 'react'
import './ReservationOption.css'

function ReservationOption({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  // 예약 정보 업데이트용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  }

  // 조식 추가 1인
  const [bkfAdultAdd, setBkfAdultAdd] = useState(0);
  const [bkfChildAdd, setBkfChildAdd] = useState(0);

  return (
    <div className='reservationOption'>

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
      
      <div>
        <h2>{rsvnInfo.selectedProduct.name}</h2>

        {/* 침대 구성(스탠다드, 디럭스) */}
        <div className={`bedChoice ${rsvnInfo.selectedProduct.name==='Lake Corner Suite' || rsvnInfo.selectedProduct.name==='Lake Suite Gourmet Package' ? 'hide' : ''}`}>
          <h4>침대 구성</h4>
          <label>
            <input type="radio" name='bedType' value='double' defaultChecked onChange={(e)=>{
              updateInfo('bedType', '더블')
            }} />
            더블
          </label>
          <label>
            <input type="radio" name='bedType' value='twin' onChange={(e)=>{
              updateInfo('bedType', '트윈')
            }} />
            트윈
          </label>
        </div>
          
          
        {/* 조식 관련 */}
        <div className="breakfast">
          {/* 조식 여부 */}
          <div className={`${rsvnInfo.selectedProduct.type==='package' ? 'btnDisabled' : ''}`}>
            <div className='breakfastChoice'>
              <p>성인</p>
              <p>28,000</p>
              <button onClick={()=>{
                if(rsvnInfo.bktAdult>0) {
                  updateInfo('bktAdult', rsvnInfo.bktAdult-1);
                }
              }}>-</button>
              <p>{rsvnInfo.bktAdult}</p>
              <button onClick={()=>{
                if(rsvnInfo.bktAdult<rsvnInfo.adultCount) {
                  updateInfo('bktAdult', rsvnInfo.bktAdult+1);
                }
              }}>+</button>
            </div>
            <div className='breakfastChoice'>
              <p>어린이(0~6세)</p>
              <p>무료</p>
              <button onClick={()=>{
                if(rsvnInfo.bktChild>0) {
                  updateInfo('bktChild', rsvnInfo.bktChild-1);
                }
              }}>-</button>
              <p>{rsvnInfo.bktChild}</p>
              <button onClick={()=>{
                if(rsvnInfo.bktChild<rsvnInfo.childCount) {
                  updateInfo('bktChild', rsvnInfo.bktChild+1);
                }
              }}>+</button>
            </div>
          </div>

          {/* 패키지 선택 시 안내 & 추가 인원 */}
          <div className={`${rsvnInfo.selectedProduct.type==='package' ? '' : 'hide'}`}>
            <p>*조식 포함 패키지를 선택하셨습니다.</p>
            <p>*패키지 혜택은 2인 기준으로 제공됩니다. 3인 예약 시, 1인 추가에 대한 식사 또는 서비스는 아래의 별도 옵션에서 선택해 주세요.</p>
            <div className="breakfastAddChoice">
              <p>성인 추가</p>
              <p>28,000</p>
              <button onClick={()=>{
                if(bkfAdultAdd>0) {
                  setBkfAdultAdd(bkfAdultAdd-1);
                  updateInfo('bktAdult', 0);
                }
              }}>-</button>
              <p>{bkfAdultAdd}</p>
              <button onClick={()=>{
                if(bkfAdultAdd<1 && (bkfAdultAdd+bkfChildAdd<1)) {
                  setBkfAdultAdd(bkfAdultAdd+1);
                  updateInfo('bktAdult', 1);
                }
              }}>+</button>
            </div>
            <div className="breakfastAddChoice">
              <p>어린이(0~6세) 추가</p>
              <p>무료</p>
              <button onClick={()=>{
                if(bkfChildAdd>0) {
                  setBkfChildAdd(bkfChildAdd-1);
                  updateInfo('bktChild', 0);

                }
              }}>-</button>
              <p>{bkfChildAdd}</p>
              <button onClick={()=>{
                if(bkfChildAdd<1 && (bkfAdultAdd+bkfChildAdd<1)) {
                  setBkfChildAdd(bkfChildAdd+1);
                  updateInfo('bktChild', 1);

                }
              }}>+</button>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReservationOption