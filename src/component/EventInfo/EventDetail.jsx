import { useNavigate, useParams } from 'react-router-dom'
import './EventDetail.css'

function EventDetail({packData}) {
  const navigate = useNavigate();

  // 클릭한 이벤트의 id 추출하기
  const { id } = useParams();
  const selectEvent = packData.find((event) => event.id === id);
  if (!selectEvent) {
    return <div>존재하지 않는 이벤트입니다.</div>
  }

  // 가격 세자리마다 콤마 함수
  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  function eventDetailCard(event) {
    return (
      <div className="eventDetailCard">

        <div className="eventBanner">
          <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${event.id}.png`} alt="" className='eventBannerImage ' />
          <div className="eventBannerText">{event.banner}</div>
        </div>

        <div className="eventHeader">
          <h2>{event.title}</h2>
          <h4>{event.desc}</h4>
          <p>{`객실 타입 : ${event.roomType}`}</p>
          <p>{`진행 기간 : ${event.period}`}</p>
          <h3>{`${formatPrice(event.price)}원 ~`}</h3>
        </div>

        <div className="eventBenefits">
          <h4>패키지 혜택</h4>
          <ul>
            {
              event.benefit.map((list, i) => {
                return (
                  <div key={i}>
                    <li>{list}</li>
                  </div>
                )
              })
            }
          </ul>
        </div>

        <div className="eventInfomation">
            <h4>패키지 안내사항</h4>
            <ul>
              {
                event.info.map((list, i) => {
                return (
                  <div key={i}>
                    <li>{list}</li>
                  </div>
                )
              })
              }
            </ul>
        </div>

      </div>
    )
  }

  return (
    <div className="eventDetail">

      <div className="eventDetailBody">
        {eventDetailCard(selectEvent)}
      </div>

      <div className="eventBtnBox">
        <div className="preEventBtn" onClick={()=>navigate('/event')}>목록</div>
        <div className="nextEventBtn" onClick={()=>navigate('/reservation')}>예약하기</div>
      </div>
      
    </div>
  )
}

export default EventDetail