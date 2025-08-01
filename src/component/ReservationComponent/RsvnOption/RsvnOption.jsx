import './RsvnOption.css'
import { useState } from 'react';

function RsvnOption({rsvnInfo, setRsvnInfo, totalGuestCount}) {
  // rsvnInfo 구조분해
  const {adultCount, selectedProduct, bkfAdult, bkfChild, bkfAdultAdd, bkfChildAdd} = rsvnInfo;

  // 예약 정보 업데이트용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  }

  // 침대 구성 선택용 스테이트
  const [isDouble, setIsDouble] = useState(true);

  return (
    <div className="rsvnOption">
      <div className="selectedRoomName">
        <h2>{selectedProduct.name}</h2>
      </div>

      {/* 침대 구성(스탠다드, 디럭스) */}
      <div className={`optionBox ${selectedProduct.max===3 ? 'hide' : ''}`}>
        <h3>침대 구성</h3>
        <div className="tab2">
          <div className={`tabBtn ${isDouble ? 'tabBtnSelected' : ''}`} onClick={(e)=>{
            setIsDouble(true);
            updateInfo('bedType', '더블');
          }} >
            더블
          </div>
          <div className={`tabBtn ${isDouble ? '' : 'tabBtnSelected'}`} onClick={(e)=>{
            setIsDouble(false);
            updateInfo('bedType', '트윈');
          }} >
            트윈
          </div>
        </div>
      </div>
        
        
      {/* 조식 관련 */}
      <div className="optionBox">
        {/* 조식 여부 */}
        <div className={`${selectedProduct.type==='package' ? 'hide' : ''}`}>
          <h3>조식</h3>
          <div className='bkfItem'>
            <div className="bkfChoiceText">
              <div className="bkfChoiceText-left">
                <p>성인</p>
              </div>
              <div className="bkfChoiceText-right">
                <p>28,000원</p>
              </div>
            </div>
            <div className="bkfChoiceBtn">
              <button onClick={()=>{
                if(bkfAdult>0) {
                  updateInfo('bkfAdult', bkfAdult-1);
                }
              }}>-</button>
              <p>{bkfAdult}</p>
              <button onClick={()=>{
                if(bkfAdult<adultCount) {
                  updateInfo('bkfAdult', bkfAdult+1);
                }
              }}>+</button>
            </div>
          </div>
          
          <div className='bkfItem'>
            <div className='bkfChoiceText'>
              <div className="bkfChoiceText-left">
                <p>어린이(7세~12세)*</p>
              </div>
              <div className="bkfChoiceText-right">
                <p>18,000원</p>
              </div>
            </div>
            <div className="bkfChoiceBtn">
              <button onClick={()=>{
                if(bkfChild>0) {
                  updateInfo('bkfChild', bkfChild-1);
                }
              }}>-</button>
              <p>{bkfChild}</p>
              <button onClick={()=>{
                if(bkfChild<rsvnInfo.childCount) {
                  updateInfo('bkfChild', bkfChild+1);
                }
              }}>+</button>
            </div>
          </div>
          <div className="bkfItem">
            <p className='messageBox'>*6세 이하 : 무료</p>
          </div>
        </div>

        {/* 패키지 선택 시 안내 & 추가 인원 */}
        <div className={`${selectedProduct.type==='package' ? '' : 'hide'}`}>
          <h3>조식</h3>
          <div className="messageBox2">
            <p>*조식 포함 패키지를 선택하셨습니다.</p>
          </div>

          <div className={`optionAddBox ${selectedProduct.max===3 ? '' : 'hide'}`}>
            <h3>조식 인원 추가</h3>
            <div className="messageBox2">
            <p>*패키지 혜택은 2인 기준으로 제공됩니다.</p>
            <p>*3인 예약 시, 1인 추가에 대한 식사 또는 서비스는 아래의 별도 옵션에서 선택해 주세요.</p>
          </div>
            <div className="bkfItem">
              <div className="bkfChoiceText">
                <div className="bkfChoiceText-left">
                  <p>성인 추가</p>
                </div>
                <div className="bkfChoiceText-right">
                  <p>28,000원</p>
                </div>
              </div>
              <div className="bkfChoiceBtn">
                <button onClick={()=>{
                  if(bkfAdultAdd>0) {
                    updateInfo('bkfAdultAdd', bkfAdultAdd-1);
                  }
                }}>-</button>
                <p>{bkfAdultAdd}</p>
                <button onClick={()=>{
                  if(totalGuestCount==3 && bkfAdultAdd<1 && (bkfAdultAdd+bkfChildAdd<1)) {
                    updateInfo('bkfAdultAdd', bkfAdultAdd+1);
                  }
                }}>+</button>
              </div>
            </div>
            <div className="bkfItem">
              <div className="bkfChoiceText">
                <div className="bkfChoiceText-left">
                  <p>어린이(7세~12세)* 추가</p>
                </div>
                <div className="bkfChoiceText-right">
                  <p>18,000원</p>
                </div>
              </div>
              <div className="bkfChoiceBtn">
                <button onClick={()=>{
                  if(bkfChildAdd>0) {
                    updateInfo('bkfChildAdd', bkfChildAdd-1);
                  }
                }}>-</button>
                <p>{bkfChildAdd}</p>
                <button onClick={()=>{
                  if(totalGuestCount==3 && bkfChildAdd<1 && (bkfAdultAdd+bkfChildAdd<1)) {
                    updateInfo('bkfChildAdd', bkfChildAdd+1);
                  }
                }}>+</button>
              </div>
            </div>
            <div className="bkfItem">
              <p className='messageBox'>*6세 이하 : 무료</p>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default RsvnOption