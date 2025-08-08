import './RsvnPay.css'
import { useEffect } from 'react';

function RsvnPay({testStart, isRight, setIsRight, setIsAllInfo, setIsAllcredit, setIsAllAgree, setIsAllValid, isOnline, setIsOnline, isAllInfo, isAllcredit, isAllAgree, setRsvnPayInfo}) {
  
  // 유효성 검사용 정규식
  const inputRegexs = {
    regexLastName: /^[a-zA-Z가-힣]+$/,
    regexFirstName: /^[a-zA-Z가-힣]+$/,
    regexEmail: /^([a-z]+\d*)+(\.?\w+)+@\w+(\.\w{2,3})+$/,
    regexTel: /^\d{9,15}$/,
    creditNum1: /^\d{4}$/,
    creditNum2: /^\d{4}$/,
    creditNum3: /^\d{4}$/,
    creditNum4: /^\d{4}$/,
  };

  // 유효성 검사
  function validateInput(e, name, regex) {
    let value = e.target.value;

    if(value) {
      if(regex.test(value)) {
        setIsRight(obj => ({...obj, [name]: true}));
      } else {
        setIsRight(obj => ({...obj, [name]: false}));
      }
    } else {
      setIsRight(obj => ({...obj, [name]: false}));
    }
  };


  // 유효기간용 배열
  const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
  const yearList = [];
  const nowTime = new Date();
  for(let i=nowTime.getFullYear(); i<=nowTime.getFullYear()+10; i++) {
    yearList.push(i);
  }
  

  useEffect(() => {
    const valid =
      isRight.lastName &&
      isRight.firstName &&
      isRight.email &&
      isRight.phone;
      
    setIsAllInfo(valid);
  }, [isRight.lastName, isRight.firstName, isRight.email, isRight.phone]);

  useEffect(() => {
    const valid =
      isRight.creditNum1 &&
      isRight.creditNum2 &&
      isRight.creditNum3 &&
      isRight.creditNum4 &&
      isRight.expirationMonth &&
      isRight.expirationYear;
      
    setIsAllcredit(valid);
  }, [isRight.creditNum1, isRight.creditNum2, isRight.creditNum3, isRight.creditNum4, isRight.expirationMonth, isRight.expirationYear]);

  useEffect(() => {
    const valid =
      isRight.agreeInfo &&
      isRight.agreeAge;
      
    setIsAllAgree(valid);
  }, [isRight.agreeInfo, isRight.agreeAge]);

  useEffect(() => {
    const valid =
      isAllInfo &&
      isAllcredit &&
      isAllAgree;
    
    setIsAllValid(valid);
  }, [isAllInfo, isAllcredit, isAllAgree]);


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
            <input className='inputItem' type="text" id='last-name-txt' name='guestname' placeholder='성' onChange={(e)=>{
                validateInput(e, 'lastName', inputRegexs.regexLastName);
                setRsvnPayInfo(prev => ({...prev, lastName: e.target.value}));
              }} required />
            <p className={`checkMessage ${testStart.lastName && !isRight.lastName ? '' : 'hide'}`}>성을 입력해주세요</p>
          </div>
          <div className="inputBox inputBox-right">
            <h3>이름 <span>*</span></h3>
            <input className='inputItem' type="text" id='first-name-txt' name='guestname' placeholder='이름' onChange={(e)=> {
                validateInput(e, 'firstName', inputRegexs.regexFirstName);
                setRsvnPayInfo(prev => ({...prev, firstName: e.target.value}));
              }} required />
            <p className={`checkMessage ${testStart.firstName && !isRight.firstName ? '' : 'hide'}`}>이름을 입력해주세요</p>
          </div>
        </div>
        <div className="inputBox">
          <h3>이메일 <span>*</span></h3>
          <input className='inputItem' type="email" id='email-txt' name='email' onChange={(e)=>validateInput(e, 'email', inputRegexs.regexEmail)} required />
          <p className={`checkMessage ${testStart.email && !isRight.email ? '' : 'hide'}`}>이메일 주소를 다시 확인해주세요</p>
        </div>
        <div className="inputBox">
          <h3>휴대폰 번호 <span>*</span></h3>
          <input className='inputItem' type="tel" id='phone-txt' name='phone' placeholder='예: 01012345678' onChange={(e)=>{
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateInput(e, 'phone', inputRegexs.regexTel);
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
              <div className={`tabBtn ${isOnline ? 'tabBtnSelected' : ''}`} onClick={()=>{
                setIsOnline(true);
                setIsAllcredit(true);
                }}>
                <p>온라인 결제</p>
              </div>
              <div className={`tabBtn ${isOnline ? '' : 'tabBtnSelected'}`} onClick={()=>{
                setIsOnline(false);
                if(isRight.creditNum1 && isRight.creditNum2 && isRight.creditNum3 && isRight.creditNum4 && isRight.expirationMonth && isRight.expirationYear)
                  setIsAllcredit(true);
                else
                  setIsAllcredit(false);
                    
                }}>
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
                      validateInput(e, 'creditNum1', inputRegexs.creditNum1);
                    }} required />
                    <input className='inputItem' type="text" id='creditNum2' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validateInput(e, 'creditNum2', inputRegexs.creditNum2)
                    }} required />
                    <input className='inputItem' type="text" id='creditNum3' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validateInput(e, 'creditNum3', inputRegexs.creditNum3)
                    }} required />
                    <input className='inputItem' type="text" id='creditNum4' name='creditNum' maxLength={4} onInput={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      validateInput(e, 'creditNum4', inputRegexs.creditNum4)
                    }} required />
                  </div>
                  <p className={`checkMessage ${(testStart.creditNum1 || testStart.creditNum2 || testStart.creditNum3 || testStart.creditNum4) && (!isRight.creditNum1 || !isRight.creditNum2 || !isRight.creditNum3 || !isRight.creditNum4) ? '' : 'hide'}`}>카드번호를 다시 확인해주세요</p>
                </div>

                <div className="inputBox">
                  <h3>유효기간</h3>
                  <div className="creditInputItem">

                    <select className='inputItem' name="expirationDate" id="expirationMonth" onChange={(e)=>{
                      if(e.target.value !== 'none') {
                        setIsRight(obj => ({...obj, expirationMonth: true}));
                      } else {
                        setIsRight(obj => ({...obj, expirationMonth: false}));
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
                    <select className='inputItem' name="expirationDate" id="expirationYear" onChange={(e)=>{
                      if(e.target.value !== 'none') {
                        setIsRight(obj => ({...obj, expirationYear: true}));
                      } else {
                        setIsRight(obj => ({...obj, expirationYear: false}));
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
            <input type="checkbox" id='checkAgreeInfo' name='checkAgree' onChange={(e)=>{
              if(e.target.checked)
                setIsRight(obj => ({...obj, agreeInfo: true}));
              else
                setIsRight(obj => ({...obj, agreeInfo: false}));
            }} required/>
            <p>[필수] 개인정보 수집 및 이용 동의</p>
          </label>
          <label>
            <input type="checkbox" id='checkAgreeAge' name='checkAgree' onChange={(e)=>{
              if(e.target.checked)
                setIsRight(obj => ({...obj, agreeAge: true}));
              else
                setIsRight(obj => ({...obj, agreeAge: false}));
            }} required/>
            <p>[필수] 만 14세 이상 이용 동의</p>
          </label>
        </div>
      </div>
    </div>
  )
}

export default RsvnPay