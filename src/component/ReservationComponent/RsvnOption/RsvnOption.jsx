import { useNavigate } from 'react-router-dom';
import './RsvnOption.css'

function RsvnOption({rsvnInfo, setRsvnInfo, totalGuestCount, preURL, nextURL}) {
  const navigate = useNavigate();

  // rsvnInfo 구조분해
  const {adultCount, selectedProduct, bktAdult, bktChild, bkfAdultAdd, bkfChildAdd} = rsvnInfo;

  // 예약 정보 업데이트용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  }

  return (
    <div className="rsvnOption">
      <div>
        <h2>{selectedProduct.name}</h2>

        {/* 침대 구성(스탠다드, 디럭스) */}
        <div className={`bedChoice ${selectedProduct.max===3 ? 'hide' : ''}`}>
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
          <div className={`${selectedProduct.type==='package' ? 'btnDisabled' : ''}`}>
            <div className='breakfastChoice'>
              <h4>조식</h4>
              <p>성인</p>
              <p>28,000원</p>
              <button onClick={()=>{
                if(bktAdult>0) {
                  updateInfo('bktAdult', bktAdult-1);
                }
              }}>-</button>
              <p>{bktAdult}</p>
              <button onClick={()=>{
                if(bktAdult<adultCount) {
                  updateInfo('bktAdult', bktAdult+1);
                }
              }}>+</button>
            </div>
            <div className='breakfastChoice'>
              <p>어린이(7세~12세)</p>
              <p>18,000원</p>
              <button onClick={()=>{
                if(bktChild>0) {
                  updateInfo('bktChild', bktChild-1);
                }
              }}>-</button>
              <p>{bktChild}</p>
              <button onClick={()=>{
                if(bktChild<rsvnInfo.childCount) {
                  updateInfo('bktChild', bktChild+1);
                }
              }}>+</button>
            </div>
            <p>*6세 이하는 무료입니다.</p>
          </div>

          {/* 패키지 선택 시 안내 & 추가 인원 */}
          <div className={`${selectedProduct.type==='package' ? '' : 'hide'}`}>
            <p>*조식 포함 패키지를 선택하셨습니다.</p>

            <div className={`bedChoice ${selectedProduct.max===3 ? '' : 'hide'}`}>
              <p>*패키지 혜택은 2인 기준으로 제공됩니다. 3인 예약 시, 1인 추가에 대한 식사 또는 서비스는 아래의 별도 옵션에서 선택해 주세요.</p>
              <div className="breakfastAddChoice">
                <h4>조식 인원 추가</h4>
                <p>성인 추가</p>
                <p>28,000원</p>
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
              <div className="breakfastAddChoice">
                <p>어린이(7세~12세) 추가</p>
                <p>18,000원</p>
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
                <p>*6세 이하는 무료입니다.</p>
            </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RsvnOption