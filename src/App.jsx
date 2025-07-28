import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import MainPage from './pages/MainPage'
import Reservation from './pages/ReservationPage/Reservation'
import ReservationRoom from './pages/ReservationPage/ReservationRoom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  // 예약 정보 오브젝트
    const [rsvnInfo, setRsvnInfo] = useState({
      startDate: new Date(),
      endDate: new Date(),
      adultCount: 1,
      childCount: 0,
      roomOrPackage: ''
    });
    
    // 요일 표시용 배열
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    // 예약 날짜 출력용
    const checkInDate = rsvnInfo.startDate && `${rsvnInfo.startDate.getFullYear()}년 ${rsvnInfo.startDate.getMonth()+1}월 ${rsvnInfo.startDate.getDate()}일 (${dayList[rsvnInfo.startDate.getDay()]})`;
    const checkOutDate = rsvnInfo.endDate
      ? `${rsvnInfo.endDate.getFullYear()}년 ${rsvnInfo.endDate.getMonth()+1}월 ${rsvnInfo.endDate.getDate()}일 (${dayList[rsvnInfo.endDate.getDay()]})`
      : '';

    // 성인, 어린이, 총 인원
    const [totalGuestCount, setTotalGuestCount] = useState(1);
  
    useEffect(()=>{
      setTotalGuestCount(rsvnInfo.adultCount+rsvnInfo.childCount);
    }, [rsvnInfo.adultCount, rsvnInfo.childCount])

    // 객실 데이터
    const [roomData, setRoomData] = useState([]);
    useEffect(()=>{
      axios.get('https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/room.json')
        .then((response)=>{
          setRoomData([...response.data]);
        })
        .catch((error)=>{
          console.log(error);
        })
    }, [])

    // 이벤트 데이터
    const [eventData, setEventata] = useState([]);
    useEffect(()=>{
      axios.get('https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/event.json')
        .then((response)=>{
          setEventata([...response.data]);
        })
        .catch((error)=>{
          console.log(error);
        })
    }, [])

  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/reservation' element={<Reservation
          rsvnInfo={rsvnInfo}
          setRsvnInfo={setRsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
        />} />
        <Route path='/reservation/room' element={<ReservationRoom
          rsvnInfo={rsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
          roomData={roomData}
          eventData={eventData}
        />} />
      </Routes>
    </>
  )
}

export default App
