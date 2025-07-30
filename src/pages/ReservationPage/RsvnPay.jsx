import { useNavigate } from 'react-router-dom';
import './RsvnPay.css'
import { useEffect, useState } from 'react';
import NowInfoPay from '../../component/ReservationComponent/RsvnNowInfo/NowInfoPay';

function ReservationPay({rsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  const navigate = useNavigate();

  // 유효성 검사 시작용
  const [testStart, setTestStart] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
    creditNum1: false,
    creditNum2: false,
    creditNum3: false,
    creditNum4: false,
    expirationMonth: false,
    expirationYear: false
  });

  // 상태 확인
  const [isRight, setIsRight] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
    creditNum1: false,
    creditNum2: false,
    creditNum3: false,
    creditNum4: false,
    expirationMonth: false,
    expirationYear: false,
    agreeInfo: false,
    agreeAge: false
  });

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

  // 결제 방식 탭
  const [isOnline, setIsOnline] = useState(true);

  // 유효기간용 배열
  const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
  const yearList = [];
  const nowTime = new Date();
  for(let i=nowTime.getFullYear(); i<=nowTime.getFullYear()+10; i++) {
    yearList.push(i);
  }
  
  // 다음 페이지로 넘기기 허용
  const [isAllInfo, setIsAllInfo] = useState(false);
  const [isAllcredit, setIsAllcredit] = useState(false);
  const [isAllAgree, setIsAllAgree] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);

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
      
      {/* 예약 선택 현황 */}
      <NowInfoPay
        rsvnInfo={rsvnInfo}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        totalGuestCount={totalGuestCount}
      />

      {/* 예약자 정보 입력 */}
      <div className="inputForm">
        <h2>예약자 정보</h2>
        <div className="inputBox">
          <h4>성 *</h4>
          <input type="text" id='last-name-txt' name='guestname' placeholder='성' onChange={(e)=>validateInput(e, 'lastName', inputRegexs.regexLastName)} required />
          <p className={`${testStart.lastName && !isRight.lastName ? '' : 'hide'}`}>성을 입력해주세요</p>
        </div>
        <div className="inputBox">
          <h4>이름 *</h4>
          <input type="text" id='first-name-txt' name='guestname' placeholder='이름' onChange={(e)=>validateInput(e, 'firstName', inputRegexs.regexFirstName)} required />
          <p className={`${testStart.firstName && !isRight.firstName ? '' : 'hide'}`}>이름을 입력해주세요</p>
        </div>
        <div className="inputBox">
          <h4>이메일 *</h4>
          <input type="email" id='email-txt' name='email' onChange={(e)=>validateInput(e, 'email', inputRegexs.regexEmail)} required />
          <p className={`${testStart.email && !isRight.email ? '' : 'hide'}`}>이메일 주소를 다시 확인해주세요</p>
        </div>
        <div className="inputBox">
          <h4>휴대폰 번호 *</h4>
          <input type="tel" id='phone-txt' name='phone' placeholder='예: 01012345678' onChange={(e)=>{
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            validateInput(e, 'phone', inputRegexs.regexTel);
          }} required />
          <p className={`${testStart.phone && !isRight.phone ? '' : 'hide'}`}>휴대폰 번호를 다시 확인해주세요</p>
        </div>
        
      </div>

      {/* 결제 영역 */}
      <div className="inputForm">
        <h2>결제 정보</h2>
        <div className="creditType">
          <div className="creditTab" onClick={()=>{
            setIsOnline(true);
            setIsAllcredit(true);
          }}>
            <p>온라인 결제</p>
          </div>
          <div className={`creditInput ${isOnline ? '' : 'hide'}`}>
            카드 선택 탭
          </div>
          <div className="creditTab" onClick={()=>{
            setIsOnline(false);
            if(isRight.creditNum1 && isRight.creditNum2 && isRight.creditNum3 && isRight.creditNum4 && isRight.expirationMonth && isRight.expirationYear)
              setIsAllcredit(true);
            else
              setIsAllcredit(false);
                
            }}>
            <p>현장 결제</p>
          </div>

          <div className={`creditInput ${isOnline ? 'hide' : ''}`}>
            <div className="inputBox">
              <h4>카드번호</h4>
              <input type="text" id='creditNum1' name='creditNum' inputMode="numeric" maxLength={4} onInput={(e)=>{
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                validateInput(e, 'creditNum1', inputRegexs.creditNum1);
              }} required />
              <input type="text" id='creditNum2' name='creditNum' maxLength={4} onInput={(e)=>{
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                validateInput(e, 'creditNum2', inputRegexs.creditNum2)
              }} required />
              <input type="text" id='creditNum3' name='creditNum' maxLength={4} onInput={(e)=>{
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                validateInput(e, 'creditNum3', inputRegexs.creditNum3)
              }} required />
              <input type="text" id='creditNum4' name='creditNum' maxLength={4} onInput={(e)=>{
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                validateInput(e, 'creditNum4', inputRegexs.creditNum4)
              }} required />
              <p className={`${(testStart.creditNum1 || testStart.creditNum2 || testStart.creditNum3 || testStart.creditNum4) && (!isRight.creditNum1 || !isRight.creditNum2 || !isRight.creditNum3 || !isRight.creditNum4) ? '' : 'hide'}`}>카드번호를 다시 확인해주세요</p>
            </div>

            <div className="inputBox">
              <h4>유효기간</h4>
              <select name="expirationDate" id="expirationMonth" onChange={(e)=>{
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
              <select name="expirationDate" id="expirationYear" onChange={(e)=>{
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
              <p className={`${(testStart.expirationMonth || testStart.expirationYear) && (!isRight.expirationMonth || !isRight.expirationYear) ? '' : 'hide'}`}>유효기간을 다시 확인해주세요</p>
            </div>
          </div>
        </div>
      </div>

      <p>현재 testStart 값: {JSON.stringify(testStart)}</p>
      <p>정보입력: {isAllInfo ? '✅' : '❌'}</p>
      <p>결제입력: {isAllcredit ? '✅' : '❌'}</p>
      <p>동의여부: {isAllAgree ? '✅' : '❌'}</p>
      <p>전체완료: {isAllValid ? '✅' : '❌'}</p>

      {/* 개인정보 동의 */}
      <div className="inputForm">
        <h2>개인정보 수집 및 이용 동의</h2>
        <div className="agreeBox">
          <label>
            <input type="checkbox" id='checkAgreeInfo' name='checkAgree' onChange={(e)=>{
              if(e.target.checked)
                setIsRight(obj => ({...obj, agreeInfo: true}));
              else
                setIsRight(obj => ({...obj, agreeInfo: false}));
            }} required/>[필수] 개인정보 수집 및 이용 동의
          </label>
          <label>
            <input type="checkbox" id='checkAgreeAge' name='checkAgree' onChange={(e)=>{
              if(e.target.checked)
                setIsRight(obj => ({...obj, agreeAge: true}));
              else
                setIsRight(obj => ({...obj, agreeAge: false}));
            }} required/>[필수] 만 14세 이상 이용 동의
          </label>
        </div>
      </div>


      {/* 이동 버튼 */}
      <div className="stepBtn">
        <div className="preBtn" onClick={()=>navigate('/reservation/option')}>이전 &gt;</div>
        
        <div className="nextBtn" onClick={()=>{
          setTestStart({
            lastName: true,
            firstName: true,
            email: true,
            phone: true,
            creditNum1: true,
            creditNum2: true,
            creditNum3: true,
            creditNum4: true,
            expirationMonth: true,
            expirationYear: true
          });
        
          if(isAllValid) {
            if(isOnline)
              alert('결제 진행 화면 띄우기');
            else {
              alert('예약이 완료되었습니다.');
              // navigate('/');
            }
          } else {
            if(!isAllInfo)
              alert('예약자 정보를 다시 확인해주세요');
            else if(!isAllcredit)
              alert('결제 정보를 다시 확인해주세요');
            else
              alert('필수 항목에 모두 동의해야 합니다');
          }
        }}>예약 완료</div>
      </div>

    </div>
  )
}

export default ReservationPay