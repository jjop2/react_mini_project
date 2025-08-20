import { useNavigate } from 'react-router-dom';
import './EventInfoList.css'
import { formatPrice } from '../../utils/format';

function EventInfoList({packData}) {
  const navigate = useNavigate();

  // 이벤트 목록용 카드
  function eventCard(pack) {
    return (
      <div className={`eventCard`} onClick={()=>navigate(`/event/${pack.id}`)}>
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${pack.id}.png`} alt="" className='eventImg' />
        <div className="eventCardBox">
          <div className="eventCardTitle">
            <h2>{pack.title}</h2>
          </div>
          <div className="eventCardContent">
            <div className="eventCardContent-top">
              <p>{pack.banner}</p>
              <p>{pack.summaryBenefit}</p>
              <p>{pack.period}</p>
            </div>
            <div className="eventCardContent-bottom">
              <h3>{`${formatPrice(pack.price)}원 ~`}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="eventInfoList">

      <div className="eventCardList">
        {
          packData.map((data, i) => {
            return (
              <div key={i}>{eventCard(data)}</div>
            )
          })
        }
      </div>

    </div>
  )
}

export default EventInfoList