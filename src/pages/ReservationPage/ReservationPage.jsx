import DatePicker from 'react-datepicker';
import './ReservationPage.css'
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

registerLocale('ko', ko);

function ReservationPage({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  // rsvnInfo 구조분해
  const {startDate, endDate, adultCount, childCount} = rsvnInfo;

  // 예약 정보 등록용 함수
  function updateInfo(key, value) {
    setRsvnInfo(obj => ({...obj, [key]: value}));
  };

  // 체크인, 체크아웃, 숙박일 수 저장
  useEffect(() => {
    if(endDate) {
      updateInfo('checkInDate', checkInDate);
      updateInfo('checkOutDate', checkOutDate);
      updateInfo('stayNights', (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
    }
  }, [startDate, endDate]);

  const navigate = useNavigate();
  const onChange = (dates) => {
    const [start, end] = dates;
    updateInfo('startDate', start);
    updateInfo('endDate', end);
  };

  // datepicker 반응형웹 달력 개수 1~2개 조정
  const [resizeDate, setResizeDate] = useState(2);
  useEffect(() => {
    function handleResize () {
      setResizeDate(window.innerWidth < 768 ? 1 : 2);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <div className="reservationPage">
      <div className="rsvnWrap1">
        <div className="rsvnTitle">
          <h3>예약</h3>
          <h2>날짜 및 인원 선택</h2>
        </div>

        {/* 투숙 날짜 선택 */}
        <div className="dateSelector">
          <div className="calendarBox">
            <DatePicker 
              showIcon
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              monthsShown={resizeDate}
              selectsRange
              inline
              locale="ko"
              dateFormat="yyyy/MM/dd"
            />
          </div>
        </div>

        <div className="selectBox">
          <div className='selectItem'>
            <p>체크인</p>
            <div className='selectContent'>
              <div className="checkInOutDate">
                {checkInDate}
              </div>
            </div>
          </div>
          <div className='selectItem'>
            <p>체크아웃</p>
            <div className='selectContent'>
              <div className="checkInOutDate">
                {checkOutDate}
              </div>
            </div>
          </div>
        </div>

        {/* 투숙 인원 선택 */}
        <div className="selectBox">
          <div className='selectItem'>
            <p>인원</p>
            <div className='selectContent'>
              <div className="countSelect">
                <p>성인</p>
                <div className="countSelectBtn">
                  <button onClick={()=>{
                    if(adultCount>1) {
                      updateInfo('adultCount', adultCount-1);
                    }
                  }}><FontAwesomeIcon icon={faMinus} /></button>
                  <p>{adultCount}</p>
                  <button onClick={()=>{
                    if(totalGuestCount<3 && adultCount<3) {
                      updateInfo('adultCount', adultCount+1);
                    }
                  }}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
              </div>
              <div className="countSelect">
                <p>어린이</p>
                <div className="countSelectBtn">
                  <button onClick={()=>{
                    if(childCount>0) {
                      updateInfo('childCount', childCount-1);
                    }
                  }}><FontAwesomeIcon icon={faMinus} /></button>
                  <p>{childCount}</p>
                  <button onClick={()=>{
                    if(totalGuestCount<3 && childCount<2) {
                      updateInfo('childCount', childCount+1);
                    }
                  }}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="nextBtnOnly" onClick={()=>{
          if(checkOutDate == '') {
            alert('체크아웃 날짜를 선택하세요');
          } else if(checkOutDate == checkInDate) {
            alert('최소 1박 이상으로 선택하세요')
          } else {
            navigate('/reservation/room');
          }
        }}>
          다음 &gt;
        </div>
      </div>
    </div>
  )
}

export default ReservationPage