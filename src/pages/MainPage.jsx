import { useState } from 'react';
import './MainPage.css'

// 객실, 다이닝 샘플 이미지
import roomDeluxe from '../images/Lake Deluxe Room.png'
import diningLIV from '../images/LIV.png'


function MainPage() {
  const [colorChange, setColorChange] = useState(false);
  

  return (
    <div className="mainPage">
      <div className="hotelImage"></div>

      <div className="eventInfo"></div>

      <div className="intro">
        <div className="introImg"></div>
        <div className="introBox">
          <div className="introText">
            <p>호수 너머로 펼쳐지는 깊은 고요</p>
            <p>그리고 숲이 전하는 치유의 숨결</p>
            <p>미식과 웰니스, 자연 속 안식을 전합니다</p>
          </div>
          <div className='moreInfo'>MORE &nbsp;&gt;</div>
        </div>
      </div>

      
      <div className="hotelInfo">
        <div className="hotelInfoCard">
          <div style={{backgroundImage: `url(https://placehold.co/300x300)`}} className='sampleImg'></div>
          <div className="hotelInfoDetail">
            <p>호수 너머로 펼쳐지는 정적</p>
            <p>편안한 구조 속에 자연이 들어옵니다</p>
            <div className='moreInfo'>Room &nbsp;&gt;</div>
          </div>
        </div>
        <div className="hotelInfoCard">
          <div style={{backgroundImage: `url(https://placehold.co/300x300)`}} className='sampleImg'></div>
          <div className="hotelInfoDetail">
            <p>산과 호수에서 온 재료, 정성스러운 조리</p>
            <p>지역의 계절이 한 접시에 담깁니다</p>
            <div className='moreInfo'>Dining &nbsp;&gt;</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MainPage;