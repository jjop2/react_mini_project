import DatePicker from 'react-datepicker';
import './Reservation.css'
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
registerLocale('ko', ko);

function Reservation() {
  // 체크인, 체크아웃 날짜
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  // 요일 표시용 배열
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];
  // 객실 수
  const [roomCount, setRoomCount] = useState(1);
  // 성인, 어린이, 총 인원
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [totalGuestCount, setTotalGuestCount] = useState(1);

  useEffect(()=>{
    setTotalGuestCount(adultCount+childCount);
  }, [adultCount, childCount])

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
          {startDate && (
          <div className="checkInOutDate">
            {`${startDate.getFullYear()}년 ${startDate.getMonth()+1}월 ${startDate.getDate()}일 (${dayList[startDate.getDay()]})`}
          </div>
          )}
        </div>
        <div className="checkInOut">
          <p>체크아웃</p>
          {endDate ? (
            <div className="checkInOutDate">
              {`${endDate.getFullYear()}년 ${endDate.getMonth()+1}월 ${endDate.getDate()}일 (${dayList[endDate.getDay()]})`}
            </div>
          ) : <div className='checkInOutDate'>&nbsp;</div>}
        </div>
      </div>

      {/* 객실 수, 투숙인원 선택 */}
      <div className="selectBox">

        <div className="countSelect">
          <p>객실</p>
          <div className="countSelectBtn">
            <button onClick={()=>{
              if(roomCount>1) {
                setRoomCount(roomCount-1);
              }
            }}>-</button>
            <p>{roomCount}</p>
            <button onClick={()=>{
              if(roomCount<2) {
                setRoomCount(roomCount+1);
              }
            }}>+</button>
          </div>
        </div>

        <div className="countSelect">
          <p>어른</p>
          <div className="countSelectBtn">
            <button onClick={()=>{
              if(adultCount>1) {
                setAdultCount(adultCount-1);
              }
            }}>-</button>
            <p>{adultCount}</p>
            <button onClick={()=>{
              if(adultCount<2) {
                setAdultCount(adultCount+1);
              }
            }}>+</button>
          </div>
        </div>

        <div className="countSelect">
          <p>어린이(0~5세)</p>
          <div className="countSelectBtn">
            <button onClick={()=>{
              if(childCount>0) {
                setChildCount(childCount-1);
              }
            }}>-</button>
            <p>{childCount}</p>
            <button onClick={()=>{
              if(childCount<1) {
                setChildCount(childCount+1);
              }
            }}>+</button>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Reservation