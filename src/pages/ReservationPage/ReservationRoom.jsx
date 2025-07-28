import './ReservationRoom.css'

function ReservationRoom({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate}) {
  // rsvnInfo 구조분해
  const {startDate, endDate, adultCount, childCount} = rsvnInfo;

  return (
    <div className="reservationRoom">
      <div className="rsvnInfoNow">
        <p></p>
      </div>
    </div>
  )
}

export default ReservationRoom