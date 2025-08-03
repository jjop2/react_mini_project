import { Outlet } from 'react-router-dom'
import './EventDetailPage.css'
import EventDetail from '../../component/EventInfo/EventDetail'

function EventDetailPage({packData}) {

  return (
    <div className="eventDetailPage">
      <div className="pageWrap">
        <EventDetail packData={packData} />
      </div>
    </div>
  )
}

export default EventDetailPage