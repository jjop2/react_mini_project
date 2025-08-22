 import { useEffect, useState } from 'react';
import './MyRsvnFormPage.css'
import { useNavigate } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';

 function MyRsvnPage() {
  const navigate = new useNavigate();

  // 유효성 검사
  const { isRight, testStart, validate, startTest, isAllValid } = new useValidation([
    "familyName", "givenName", "rsvnNum"
  ]);

  return (
    <div className="myRsvnPage">
      <div className="rsvnWrap1">

        <div className="pageTitle">
          <h2>예약 조회</h2>
        </div>

        <div className="pageBody">

          <div className="inputForm">
            <div className="inputNameBox">
              <div className="inputBox inputBox-left">
                <h3>성 <span>*</span></h3>
                <input className='inputItem' type="text" id='family-name-txt' name='guestname' placeholder='성' onChange={(e)=>validate('familyName', e.target.value)} required />
                <p className={`checkMessage ${testStart.familyName && !isRight.familyName ? '' : 'hide'}`}>성을 입력해주세요</p>
              </div>
              <div className="inputBox inputBox-right">
                <h3>이름 <span>*</span></h3>
                <input className='inputItem' type="text" id='given-name-txt' name='guestname' placeholder='이름' onChange={(e)=>validate('givenName', e.target.value)} required />
                <p className={`checkMessage ${testStart.givenName && !isRight.givenName ? '' : 'hide'}`}>이름을 입력해주세요</p>
              </div>
            </div>
            <div className="inputBox">
              <h3>예약번호 <span>*</span></h3>
              <input className='inputItem' type="text" id='rsvnNum-txt' name='rsvnNum' placeholder='예약번호 입력' maxLength={10} onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/g, '')}}
              onChange={(e)=>validate('rsvnNum', e.target.value)} required />
              <p className={`checkMessage ${testStart.rsvnNum && !isRight.rsvnNum ? '' : 'hide'}`}>예약번호를 다시 확인해주세요</p>
            </div>
          </div>

          <div className="MyRsvnNextBtn">
            <div className="nextBtn" onClick={()=>{
              startTest();
            
              if(isAllValid) {
                // 로컬에 최근 1개만 저장, 불러오는 것도 그냥 그거 불러오고 있음 (임시)
                navigate('/reservation/result');
                
              } else {
                alert('입력한 정보를 확인해주세요');
              }
            }}>예약 조회</div>
          </div>

        </div>

      </div>
    </div>
  )
 }

 export default MyRsvnPage