import { useEffect, useState } from 'react';
import './MainPage.css'

// 객실, 다이닝 샘플 이미지
import roomDeluxe from '../images/Lake Deluxe Room.png'
import diningLIV from '../images/LIV.png'


function MainPage() {
  const [currenIndex, setCurrentIndex] = useState(0);

  function preIndex() {
    if(currenIndex > 0)
      setCurrentIndex(currenIndex - 1);
    else
      setCurrentIndex(2);
  }

  function nextIndex() {
    if(currenIndex < 2)
      setCurrentIndex(currenIndex + 1);
    else
      setCurrentIndex(0);
  }

  function toIndexNum(indexNum) {
    setCurrentIndex(indexNum);
  }

  useEffect(()=>{
    const autoIndex = setInterval(()=>{
      nextIndex();
    }, 5000);

    return()=>{
      clearInterval(autoIndex);
    }
    
  }, [currenIndex])

  return (
    <div className="mainPage">
      <div className="hotelImage"></div>

      {/* 프로모션 정보 */}

      <div className="eventBox">
        <div className="eventCarousel">
          <div className="eventWidth" style={{transform: `translateX(-${currenIndex * 12}00px)`}}>
            <div className="eventInfo">
              <div style={{backgroundImage: `url(https://placehold.co/1200x500/3D0080/FFF?text=CENTER+TEST)`}} className='eventImg'></div>
            </div>
            <div className="eventInfo">
              <div style={{backgroundImage: `url(https://placehold.co/1200x500/000000/FFF)`}} className='eventImg'></div>
            </div>
            <div className="eventInfo">
              <div style={{backgroundImage: `url(https://placehold.co/1200x500/3D0080/FFF)`}} className='eventImg'></div>
            </div>
          </div>
        </div>

        <div className="carouselBtn">
          <div className="carouselBtn-pre" onClick={preIndex}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className='carouselIndexBtn'>
            <p className='carouselIndexBtn-0' onClick={()=>{
              toIndexNum(0)
            }}>
              <i class="fa-solid fa-circle-dot"></i>
            </p>
            <p className='carouselIndexBtn-1' onClick={()=>{
              toIndexNum(1)
            }}>
              <i class="fa-solid fa-circle-dot"></i>
            </p>
            <p className='carouselIndexBtn-2' onClick={()=>{
              toIndexNum(2)
            }}>
              <i class="fa-solid fa-circle-dot"></i>
            </p>
          </div>
          <div className="carouselBtn-next" onClick={nextIndex}>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
     
  
      {/* 호텔 소개 */}
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

      {/* 객실, 다이닝 짧은 소개 */}
      <div className="hotelInfo">
        <div className="hotelInfoCard hotelInfoCard-left">
          <div style={{backgroundImage: `url(https://placehold.co/300x300)`}} className='sampleImg'></div>
          <div className="hotelInfoDetail">
            <p>호수 너머로 펼쳐지는 정적</p>
            <p>편안한 구조 속에 자연이 들어옵니다</p>
            <div className='moreInfo'>Room &nbsp;&gt;</div>
          </div>
        </div>
        <div className="hotelInfoCard hotelInfoCard-right">
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