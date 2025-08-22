import './HotelInfo.css'

// 이미지
import hotelStoryImg from '../../images/mainPage3.png'
import keyValueImg1 from '../../images/keyValueImg1.png'
import keyValueImg2 from '../../images/keyValueImg2.png'
import keyValueImg3 from '../../images/keyValueImg3.png'
import keyValueImg4 from '../../images/keyValueImg4.png'
import RsvnInfoBox from '../RsvnInfoBox/RsvnInfoBox'

function HotelInfo() {
  const keyValues = [
    { title: "All Lake View", desc: "모든 객실, 호수 조망 발코니", img: keyValueImg1},
    { title: "Local & Seasonal", desc: "레스토랑 LIV의 제철 로컬 다이닝", img: keyValueImg2},
    { title: "Quiet Wellness", desc: "사우나, 호숫가 휴식, 아로마 리추얼", img: keyValueImg3},
    { title: "Sustainable", desc: "친환경 리넨, 로컬 어메니티, 지역 협업", img: keyValueImg4}
  ];

  // key value 카드 형식
  function keyVauleCard(keyValue) {
    return (
      <div className="keyValueCard">
        <div className="keyValueImg" style={{backgroundImage: `url(${keyValue.img})`}}></div>
        <div className="keyValueTitle">
          <h3>{keyValue.title}</h3>
        </div>
        <div className="keyValueDesc">
          <p>{keyValue.desc}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hotelInfo">

      <div className="hotelStory">
        <div className="hotelStoryImg" style={{backgroundImage: `url(${hotelStoryImg})`}}></div>
        <div className="hotelStoryText">
          <h4>Stillness by the Waters</h4>
          <p>
            MIREN은 호수의 잔잔함을 닮았습니다.
            <br /><br />우리는 속도를 늦추고, 깊게 호흡하며,
            <br />자연의 결을 따라 머무는 시간을 제안합니다.
            <br /><br />38개의 전 객실은 모두 호수와 마주하고 있으며,
            <br /> 로컬 재료로 구성한 다이닝과 은은한 향의 힐링 프로그램이 일상의 여백을 채웁니다.
          </p>
        </div>
      </div>

      <div className="keyValues">
        <div className="keyValuesTitle">
          <p>우리의 약속</p>
        </div>
        <div className="keyValuesItem">
          {
            keyValues.map((data, i) => {
              return (
                <div key={i}>{keyVauleCard(data)}</div>
              )
            })
          }
        </div>

      </div>
      
      <div className="hotelInfoBox">
        <RsvnInfoBox />
      </div>

    </div>
  )
}

export default HotelInfo