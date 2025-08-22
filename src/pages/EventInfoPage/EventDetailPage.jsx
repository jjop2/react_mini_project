import { Outlet } from 'react-router-dom'
import './EventDetailPage.css'
import EventDetail from '../../component/EventInfo/EventDetail'

function EventDetailPage({packData}) {

  return (
    <div className="eventDetailPage">
      <div className="pageWrap">
        <div className="pageBody">
          <EventDetail packData={packData} />
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage