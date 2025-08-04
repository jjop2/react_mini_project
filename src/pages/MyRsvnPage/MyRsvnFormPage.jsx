 import { useEffect, useState } from 'react';
import './MyRsvnFormPage.css'

 function MyRsvnPage() {
   // 유효성 검사 시작용
    const [testStart, setTestStart] = useState({
      lastName: false,
      firstName: false,
      rsvnNum: false
    });
  
    // 상태 확인
    const [isRight, setIsRight] = useState({
      lastName: false,
      firstName: false,
      rsvnNum: false
    });
  
    // 다음 페이지로 넘기기 허용
    const [isAllInfo, setIsAllInfo] = useState(false);

  // 유효성 검사용 정규식
  const inputRegexs = {
    regexLastName: /^[a-zA-Z가-힣]+$/,
    regexFirstName: /^[a-zA-Z가-힣]+$/,
    regexRsvnNum: /^\d{10}$/
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

  useEffect(() => {
    const valid =
      isRight.lastName &&
      isRight.firstName &&
      isRight.rsvnNum
      
    setIsAllInfo(valid);
  }, [isRight.lastName, isRight.firstName, isRight.rsvnNum]);

  return (
    <div className="myRsvnPage">
      <div className="rsvnWrap1">

        <div className="pageTitle">
          <h2>예약 조회</h2>
        </div>

        <div className="inputForm">
          <div className="inputNameBox">
            <div className="inputBox inputBox-left">
              <h3>성 <span>*</span></h3>
              <input className='inputItem' type="text" id='last-name-txt' name='guestname' placeholder='성' onChange={(e)=>validateInput(e, 'lastName', inputRegexs.regexLastName)} required />
              <p className={`checkMessage ${testStart.lastName && !isRight.lastName ? '' : 'hide'}`}>성을 입력해주세요</p>
            </div>
            <div className="inputBox inputBox-right">
              <h3>이름 <span>*</span></h3>
              <input className='inputItem' type="text" id='first-name-txt' name='guestname' placeholder='이름' onChange={(e)=>validateInput(e, 'firstName', inputRegexs.regexFirstName)} required />
              <p className={`checkMessage ${testStart.firstName && !isRight.firstName ? '' : 'hide'}`}>이름을 입력해주세요</p>
            </div>
          </div>
          <div className="inputBox">
            <h3>예약번호 <span>*</span></h3>
            <input className='inputItem' type="text" id='rsvnNum-txt' name='rsvnNum' placeholder='예약번호 입력' maxLength={10} onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
            onChange={(e)=>validateInput(e, 'rsvnNum', inputRegexs.regexRsvnNum)} required />
            <p className={`checkMessage ${testStart.rsvnNum && !isRight.rsvnNum ? '' : 'hide'}`}>예약번호를 다시 확인해주세요</p>
          </div>
        </div>

        <div className="MyRsvnNextBtn">
          <div className="nextBtn" onClick={()=>{
            setTestStart({
              lastName: true,
              firstName: true,
              rsvnNum: true
            });
          
            if(isAllInfo) {
              alert('예약조회');
              
            } else {
              alert('입력한 정보를 확인해주세요');
            }
          }}>예약 조회</div>
        </div>

      </div>
    </div>
  )
 }

 export default MyRsvnPage