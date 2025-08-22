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
import ScrollToTop from './component//ScrollToTop'
import DiningInfoPage from './pages/DiningInfoPage/DiningInfoPage'
import EventInfoPage from './pages/EventInfoPage/EventInfoPage'
import EventDetailPage from './pages/EventInfoPage/EventDetailPage'
import Footer from './component/Footer'
import MyRsvnFormPage from './pages/MyRsvnPage/MyRsvnFormPage'
import RsvnResultPage from './pages/ReservationPage/RsvnResultPage'
import HotelInfoPage from './pages/HotelInfoPage/HotelInfoPage'

function App() {
  // 예약 정보 오브젝트
  // 세션 스토리지 저장
  let savedRsvnINfo = sessionStorage.getItem('rsvnInfo');
  let getRsvnInfo;

  if(savedRsvnINfo) {
    // 세션 스토리지에 예약정보가 이미 있으면 불러오기
    // 단, 날짜는 여전히 문자열이므로 Date() 안에 날짜+시간 문자열(=parsed.start/endDate) 전달하여 다시 날짜 형식으로 바꿔줘야 함
    const parsed = JSON.parse(sessionStorage.getItem('rsvnInfo'));
    getRsvnInfo = {
      ...parsed,
      startDate: new Date(parsed.startDate),
      endDate: new Date(parsed.endDate),
    }
  } else {
    // 세션 스토리지에 예약정보가 없으면 초기값 세팅
    getRsvnInfo = {
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
      bkfChildAdd: 0,
      // 체크인, 체크아웃, 숙박일 수
      checkInDate: '',
      checkOutDate: '',
      stayNights: 0
    }
  }
  
  const [rsvnInfo, setRsvnInfo] = useState(getRsvnInfo);

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

  useEffect(() => {
    sessionStorage.setItem('rsvnInfo', JSON.stringify(rsvnInfo));
  }, [rsvnInfo]);


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


  // axios
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

  // 다이닝 데이터
  const [diningkData, setDiningData] = useState([]);
  useEffect(()=>{
    axios.get('https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/dining.json')
      .then((response)=>{
        setDiningData([...response.data]);
      })
      .catch((error)=>{
        console.log(error);
      })
  }, [])

  
  return (
    <>
      <Header />

      <ScrollToTop />
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
          setRsvnInfo={setRsvnInfo}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          totalGuestCount={totalGuestCount}
          packData={packData}
        />} />
        <Route path='/reservation/result' element={<RsvnResultPage />} />
        <Route path='/about' element={<HotelInfoPage />} />
        <Route path='/room' element={<RoomInfoPage
          roomData={roomData}
        />} />
        <Route path='/dining' element={<DiningInfoPage
          diningkData={diningkData}
        />} />
        <Route path='/event' element={<EventInfoPage
          packData={packData}
        />} />
        <Route path='/event/:id' element={<EventDetailPage
          packData={packData}
        />} />
        <Route path='/my-reservation-form' element={<MyRsvnFormPage/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
