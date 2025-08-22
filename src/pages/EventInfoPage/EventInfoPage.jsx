import EventInfoList from '../../component/EventInfo/EventInfoList'
import './EventInfoPage.css'

function EventInfoPage({packData}) {
  return (
    <div className="eventInfoPage">
      <div className="pageWrap">

        <div className="pageTitle">
          <h2>이벤트</h2>
        </div>

        <div className="pageBody">
          <EventInfoList
            packData={packData}
          />
        </div>

      </div>
    </div>
  )
}

export default EventInfoPage