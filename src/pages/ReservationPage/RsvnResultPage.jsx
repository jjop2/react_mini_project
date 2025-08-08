import RsvnResult from '../../component/ReservationComponent/RsvnResult/RsvnResult'
import './RsvnResultPage.css'

function RsvnResultPage() {
  return (
    <div className="rsvnResultPage">
      <div className="rsvnWrap1">

        <div className="pageTitle">
          <h2>예약 결과</h2>
        </div>

        <RsvnResult />
      </div>
    </div>
  )
}

export default RsvnResultPage