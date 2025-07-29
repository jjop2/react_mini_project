import { useNavigate } from 'react-router-dom';
import './RsvnPay.css'
import { useState } from 'react';
import NowInfoPay from '../../component/nowInfo/nowInfoPay';

function ReservationPay({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  const navigate = useNavigate();

  // 유효성 검사 시작용 버튼
  const [testStart, setTestStart] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
  });

  // 상태 확인
  const [isRight, setIsRight] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
  });

  // 유효성 검사용 정규식
  const inputRegexs = {
    regexLastName: /^[a-zA-Z가-힣]+$/,
    regexFirstName: /^[a-zA-Z가-힣]+$/,
    regexEmail: /^([a-z]+\d*)+(\.?\w+)+@\w+(\.\w{2,3})+$/,
    regexTel: /^\d{9,11}$/
  };

  // 유효성 검사
  function validateInput(e, name, regex) {
    let value = e.target.value;

    setTestStart(obj => ({...obj, [name]: true}));

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
  
  // 다음 페이지로 넘기기 허용
  const [inputValid, setInputValid] = useState(false);


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
      <div className="guestInfo">
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
          <input type="email" id='email-txt' name='email' placeholder='이메일' onChange={(e)=>validateInput(e, 'email', inputRegexs.regexEmail)} required />
          <p className={`${testStart.email && !isRight.email ? '' : 'hide'}`}>이메일 주소를 다시 확인해주세요</p>
        </div>
        <div className="inputBox">
          <h4>휴대폰 번호 *</h4>
          <input type="tel" id='phone-txt' name='phone' placeholder='휴대폰 번호' onChange={(e)=>validateInput(e, 'phone', inputRegexs.regexTel)} required />
          <p className={`${testStart.phone && !isRight.phone ? '' : 'hide'}`}>휴대폰 번호를 다시 확인해주세요</p>
        </div>

        <p>현재 testStart 값: {JSON.stringify(testStart)}</p>
        <p>성 유효성: {isRight.lastName ? '✅' : '❌'}</p>
        <p>이름 유효성: {isRight.firstName ? '✅' : '❌'}</p>
        <p>이메일 유효성: {isRight.email ? '✅' : '❌'}</p>
        <p>휴대폰 유효성: {isRight.phone ? '✅' : '❌'}</p>
      </div>




      {/* 이동 버튼 */}
      <div className="preBtn" onClick={()=>navigate('/reservation/option')}>이전 &gt;</div>
      <div className="nextBtn" onClick={()=>{
        setTestStart({
          lastName: true,
          firstName: true,
          email: true,
          phone: true
        });
      }}>예약 완료</div>



    </div>
  )
}

export default ReservationPay