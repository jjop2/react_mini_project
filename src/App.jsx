import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import MainPage from './pages/MainPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import RsvnRoomPage from './pages/ReservationPage/RsvnRoomPage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RsvnOptionPage from './pages/ReservationPage/RsvnOptionPage'
import RsvnPayPage from './pages/ReservationPage/RsvnPayPage'
import RoomInfoPage from './pages/RoomInfoPage/RoomInfoPage'

function App() {
  // 예약 정보 오브젝트
    const [rsvnInfo, setRsvnInfo] = useState({
      // 체크인아웃
      startDate: new Date(),
      endDate: new Date(),
      // 투숙 인원
      adultCount: 1,
      childCount: 0,
      // 선택한 패키지/객실, 가격, 최대 인원 + 침대 타입
      selectedProduct: {},
      bedType: '더블',
      // 조식 인원, 추가 인원
      bkfAdult: 0,
      bkfChild: 0,
      bkfAdultAdd: 0,
      bkfChildAdd: 0
    });

    useEffect(() => {
      setRsvnInfo(obj => ({
        ...obj,
        bedType: '더블',
        bkfAdult: 0,
        bkfChild: 0,
        bkfAdultAdd: 0,
        bkfChildAdd: 0
      }));
    }, [rsvnInfo.selectedProduct]);

    // 요일 표시용 배열
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    // 예약 날짜 출력용
    const checkInDate = rsvnInfo.startDate && `${rsvnInfo.startDate.getFullYear()}년 ${rsvnInfo.startDate.getMonth()+1}월 ${rsvnInfo.startDate.getDate()}일 (${dayList[rsvnInfo.startDate.getDay()]})`;
    const checkOutDate = rsvnInfo.endDate
      ? `${rsvnInfo.endDate.getFullYear()}년 ${rsvnInfo.endDate.getMonth()+1}월 ${rsvnInfo.endDate.getDate()}일 (${dayList[rsvnInfo.endDate.getDay()]})`
      : '';
    
    // 투숙 총 인원
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

    // 패키지 데이터
    const [packData, setPackData] = useState([]);
    useEffect(()=>{
      axios.get('https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/pack.json')
        .then((response)=>{
          setPackData([...response.data]);
        })
        .catch((error)=>{
          console.log(error);
        })
    }, [])

  
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage packData={packData} />} />
        <Route path='/reservation' element={<ReservationPage
          rsvnInfo={rsvnInfo}
          setRsvnInfo={setRsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
        />} />
        <Route path='/reservation/room' element={<RsvnRoomPage
          rsvnInfo={rsvnInfo}
          setRsvnInfo={setRsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
          roomData={roomData}
          packData={packData}
        />} />
        <Route path='/reservation/option' element={<RsvnOptionPage 
          rsvnInfo={rsvnInfo}
          setRsvnInfo={setRsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
        />} />
        <Route path='/reservation/payment' element={<RsvnPayPage 
          rsvnInfo={rsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
        />} />
        <Route path='/room' element={<RoomInfoPage
          roomData={roomData}
        />} />
      </Routes>
    </>
  )
}

export default App
