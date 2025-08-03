import { useEffect, useState } from 'react';
import './MainPage.css'

// 캐러셀 이미지
import carouselImg1 from '../images/lake-standard-summer-escape.png'
import carouselImg2 from '../images/deluxe-wellness-stay.png'
import carouselImg3 from '../images/lake-suite-gourmet-package.png'
const carouselImgs = [carouselImg1, carouselImg2, carouselImg3];

// 객실, 다이닝 샘플 이미지
import roomSample from '../images/mainPageRoom.png'
import diningSample from '../images/mianPageDining.png'
import { useNavigate } from 'react-router-dom';


function MainPage({packData}) {
  const [currenIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

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

      {/* 이벤트 정보 */}
      <div className="eventBox">
        <div className="eventCarousel">
          <div className="eventWidth" style={{transform: `translateX(-${currenIndex * 100}%)`}}>
            {
              packData.map((data, i) => {
                return (
                  <div className="eventInfo" onClick={()=>navigate(`/event/${data.id}`)} key={i}>
                    <div style={{backgroundImage: `url(${carouselImgs[i]})`, backgroundPosition: 'center bottom'}} className='eventImg'></div>
                  </div>
                )
              })
            }

            {/* <div className="eventInfo" onClick={()=>navigate(`/event/${packData[0].id}`)}>
              <div style={{backgroundImage: `url(${carouselImg1})`, backgroundPosition: 'center bottom'}} className='eventImg'></div>
            </div>
            <div className="eventInfo" onClick={()=>navigate(`/event/${packData[1].id}`)}>
              <div style={{backgroundImage: `url(${carouselImg2})`, backgroundPosition: 'center bottom'}} className='eventImg'></div>
            </div>
            <div className="eventInfo" onClick={()=>navigate(`/event/${packData[2].id}`)}>
              <div style={{backgroundImage: `url(${carouselImg3})`, backgroundPosition: 'center bottom'}} className='eventImg'></div>
            </div> */}

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
              <i className="fa-solid fa-circle-dot"></i>
            </p>
            <p className='carouselIndexBtn-1' onClick={()=>{
              toIndexNum(1)
            }}>
              <i className="fa-solid fa-circle-dot"></i>
            </p>
            <p className='carouselIndexBtn-2' onClick={()=>{
              toIndexNum(2)
            }}>
              <i className="fa-solid fa-circle-dot"></i>
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
          <div style={{backgroundImage: `url(${roomSample})`}} className='sampleImg'></div>
          <div className="hotelInfoDetail">
            <p>호수 너머로 펼쳐지는 정적</p>
            <p>편안한 구조 속에 자연이 들어옵니다</p>
            <div className='moreInfo' onClick={()=>navigate('/room')}>Room &nbsp;&gt;</div>
          </div>
        </div>
        <div className="hotelInfoCard hotelInfoCard-right">
          <div style={{backgroundImage: `url(${diningSample})`}} className='sampleImg'></div>
          <div className="hotelInfoDetail">
            <p>산과 호수에서 온 재료, 정성스러운 조리</p>
            <p>지역의 계절이 한 접시에 담깁니다</p>
            <div className='moreInfo' onClick={()=>navigate('/dining')}>Dining &nbsp;&gt;</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MainPage;