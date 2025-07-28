import DatePicker from 'react-datepicker';
import './Reservation.css'
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
registerLocale('ko', ko);

function Reservation({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate}) {
  // rsvnInfo 구조분해
  const {startDate, endDate, adultCount, childCount} = rsvnInfo;

  // 예약 정보 등록용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  };

  const navigate = useNavigate();
  const onChange = (dates) => {
    const [start, end] = dates;
    updateInfo('startDate', start);
    updateInfo('endDate', end);
  };

  return (
    <div className="reservation">
      <div className="reservationTitle">
        <h3>예약</h3>
        <h2>날짜 및 인원 선택</h2>
      </div>

      {/* 투숙 날짜 선택 */}
      <div className="dateSelector">
          <DatePicker 
            showIcon
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange
            inline
            locale="ko"
            dateFormat="yyyy/MM/dd"
          />
        <div className="checkInOut">
          <p>체크인</p>
          <div className="checkInOutDate">
            {checkInDate}
          </div>
        </div>
        <div className="checkInOut">
          <p>체크아웃</p>
          <div className="checkInOutDate">
            {checkOutDate}
          </div>
        </div>
      </div>

      {/* 투숙 인원 선택 */}
      <div className="selectBox">
        <div className="countSelect">
          <p>어른</p>
          <div className="countSelectBtn">
            <button onClick={()=>{
              if(adultCount>1) {
                updateInfo('adultCount', adultCount-1);
              }
            }}>-</button>
            <p>{adultCount}</p>
            <button onClick={()=>{
              if(totalGuestCount<3 && adultCount<3) {
                updateInfo('adultCount', adultCount+1);
              }
            }}>+</button>
          </div>
        </div>

        <div className="countSelect">
          <p>어린이(0~5세)</p>
          <div className="countSelectBtn">
            <button onClick={()=>{
              if(childCount>0) {
                updateInfo('childCount', childCount-1);
              }
            }}>-</button>
            <p>{childCount}</p>
            <button onClick={()=>{
              if(totalGuestCount<3 && childCount<2) {
                updateInfo('childCount', childCount+1);
              }
            }}>+</button>
          </div>
        </div>
      </div>

      <div className="nextBtn" onClick={()=>{
        if(checkOutDate == '') {
          alert('체크아웃 날짜를 선택하세요');
        } else if(checkOutDate == checkInDate) {
          alert('최소 1박 이상으로 선택하세요')
        } else {
          navigate('/reservation/room');
        }
      }}>
        다음
      </div>
      
    </div>
  )
}

export default Reservation