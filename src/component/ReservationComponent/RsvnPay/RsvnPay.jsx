import RsvnInfoBox from '../../RsvnInfoBox/RsvnInfoBox';
import './RsvnPay.css'

function RsvnPay({testStart, isRight, validate, isOnline, setIsOnline, setRsvnPayInfo}) {

  // 유효성 검사 그룹
  

  // 유효기간용 배열
  const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
  const yearList = [];
  const nowTime = new Date();
  for(let i=nowTime.getFullYear(); i<=nowTime.getFullYear()+10; i++) {
    yearList.push(i);
  }

  return (
    <div className="rsvnPay">

      {/* 예약자 정보 입력 */}
      <div className="inputForm">
        <div className="inputTitle">
          <h2>예약자 정보</h2>
        </div>
        <div className="inputNameBox">
          <div className="inputBox inputBox-left">
            <h3>성 <span>*</span></h3>
            <input className='inputItem' type="text" id='family-name-txt' name='guestname' placeholder='성' onChange={(e)=>{
                validate('familyName', e.target.value);
                setRsvnPayInfo(prev => ({...prev, familyName: e.target.value}));
              }} required />
            <p className={`checkMessage ${testStart.familyName && !isRight.familyName ? '' : 'hide'}`}>성을 입력해주세요</p>
          </div>
          <div className="inputBox inputBox-right">
            <h3>이름 <span>*</span></h3>
            <input className='inputItem' type="text" id='given-name-txt' name='guestname' placeholder='이름' onChange={(e)=> {
                validate('givenName', e.target.value);
                setRsvnPayInfo(prev => ({...prev, givenName: e.target.value}));
              }} required />
            <p className={`checkMessage ${testStart.givenName && !isRight.givenName ? '' : 'hide'}`}>이름을 입력해주세요</p>
          </div>
        </div>
        <div className="inputBox">
          <h3>이메일 <span>*</span></h3>
          <input className='inputItem' type="email" id='email-txt' name='email' onChange={(e)=>validate('email', e.target.value)} required />
          <p className={`checkMessage ${testStart.email && !isRight.email ? '' : 'hide'}`}>이메일 주소를 다시 확인해주세요</p>
        </div>
        <div className="inputBox">
          <h3>휴대폰 번호 <span>*</span></h3>
          <input className='inputItem' type="tel" id='phone-txt' name='phone' placeholder='예: 01012345678' onChange={(e)=>{
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validate('phone', e.target.value);
            setRsvnPayInfo(prev => ({...prev, phone: e.target.value}));
          }} required />
          <p className={`checkMessage ${testStart.phone && !isRight.phone ? '' : 'hide'}`}>휴대폰 번호를 다시 확인해주세요</p>
        </div>
        
      </div>

      {/* 결제 영역 */}
      <div className="inputForm">
        <div className="inputTitle">
          <h2>결제 정보</h2>
        </div>
        <div className="creditType">
          <div className="creditTabBox">

            <div className="tab2">
              <div className={`tabBtn ${isOnline ? 'tabBtnSelected' : ''}`} onClick={()=> {
                  setIsOnline(true);

                  // 임시 코드 : 카드 결제 기능이 없으므로
                  validate('creditNum1', '1234');
                  validate('creditNum2', '1234');
                  validate('creditNum3', '1234');
                  validate('creditNum4', '1234');
                  validate('expirationMonth', '1');
                  validate('expirationYear', '2035');
                }}>
                <p>온라인 결제</p>
              </div>
              <div className={`tabBtn ${isOnline ? '' : 'tabBtnSelected'}`} onClick={()=>setIsOnline(false)}>
                <p>현장 결제</p>
              </div>
            </div>

            <div className="creditContentItem">
              <div className={`inputBox inputTemp ${isOnline ? '' : 'hide'}`}>
                === 카드 선택 탭 ===
              </div>
              <div className={` ${isOnline ? 'hide' : ''}`}>
                <div className="inputBox">
                  <h3>카드번호</h3>
                  <div className="creditInputItem">
                    <input className='inputItem' type="text" id='creditNum1' name='creditNum' inputMode="numeric" maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validate('creditNum1', e.target.value);
                    }} required />
                    <input className='inputItem' type="text" id='creditNum2' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validate('creditNum2', e.target.value)
                    }} required />
                    <input className='inputItem' type="text" id='creditNum3' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validate('creditNum3', e.target.value)
                    }} required />
                    <input className='inputItem' type="text" id='creditNum4' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validate('creditNum4', e.target.value)
                    }} required />
                  </div>
                  <p className={`checkMessage ${(testStart.creditNum1 || testStart.creditNum2 || testStart.creditNum3 || testStart.creditNum4) && (!isRight.creditNum1 || !isRight.creditNum2 || !isRight.creditNum3 || !isRight.creditNum4) ? '' : 'hide'}`}>카드번호를 다시 확인해주세요</p>
                </div>

                <div className="inputBox">
                  <h3>유효기간</h3>
                  <div className="creditInputItem">

                    <select className='inputItem' name="expirationMonth" id="expirationMonth" onChange={(e)=>{
                      if(e.target.value !== 'none') {
                        validate("expirationMonth", true);
                      } else {
                        validate("expirationMonth", false);
                      }
                    }} required>
                      <option value="none">월</option>
                      {
                        monthList.map((month,i) => {
                          return (
                          <option value={month} key={i}>{month}</option>
                          )
                        })
                      }
                    </select>
                    <select className='inputItem' name="expirationYear" id="expirationYear" onChange={(e)=>{
                      if(e.target.value !== 'none') {
                        validate("expirationYear", true);
                      } else {
                        validate("expirationYear", false);
                      }
                    }} required>
                      <option value="none">년</option>
                      {
                        yearList.map((year,i) => {
                          return (
                          <option value={year} key={i}>{year}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <p className={`checkMessage ${(testStart.expirationMonth || testStart.expirationYear) && (!isRight.expirationMonth || !isRight.expirationYear) ? '' : 'hide'}`}>유효기간을 다시 확인해주세요</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 개인정보 동의 */}
      <div className="inputForm">
        <div className="inputTitle">
          <h2>개인정보 수집 및 이용 동의</h2>
        </div>
        <div className="agreeBox">
          <label>
            <input type="checkbox" id='checkAgreeInfo' name='checkAgreeInfo' onChange={(e)=>{
              if(e.target.checked)
                validate("checkAgreeInfo", true);
              else
                validate("checkAgreeInfo", false);
            }} required/>
            <p>[필수] 개인정보 수집 및 이용 동의</p>
          </label>
          <label>
            <input type="checkbox" id='checkAgreeAge' name='checkAgreeAge' onChange={(e)=>{
              if(e.target.checked)
                validate("checkAgreeAge", true);
              else
                validate("checkAgreeAge", false);
            }} required/>
            <p>[필수] 만 14세 이상 이용 동의</p>
          </label>
        </div>
      </div>

      <RsvnInfoBox />

    </div>
  )
}

export default RsvnPay