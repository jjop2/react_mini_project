import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import MainPage from './pages/MainPage'
import Reservation from './pages/ReservationPage/Reservation'
import ReservationRoom from './pages/ReservationPage/ReservationRoom'
import { useEffect, useState } from 'react'

function App() {
  // 예약 정보 오브젝트
    const [rsvnInfo, setRsvnInfo] = useState({
      startDate: new Date(),
      endDate: new Date(),
      adultCount: 1,
      childCount: 0
    });
    
    // 요일 표시용 배열
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];

    // 성인, 어린이, 총 인원
    const [totalGuestCount, setTotalGuestCount] = useState(1);
  
    useEffect(()=>{
      setTotalGuestCount(rsvnInfo.adultCount+rsvnInfo.childCount);
    }, [rsvnInfo.adultCount, rsvnInfo.childCount])
  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/reservation' element={<Reservation
          rsvnInfo={rsvnInfo}
          setRsvnInfo={setRsvnInfo}
          dayList={dayList}
          totalGuestCount={totalGuestCount}
        />} />
        <Route path='/reservation/room' element={<ReservationRoom
          rsvnInfo={rsvnInfo}
          dayList={dayList}
          totalGuestCount={totalGuestCount}
        />} />
      </Routes>
    </>
  )
}

export default App
