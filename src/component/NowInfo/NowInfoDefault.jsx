function NowInfoDefault({rsvnInfo, checkInDate, checkOutDate}) {

  return (
  <div className="rsvnInfoNow">
    <div>
      <p>날짜</p>
      <p>{`${checkInDate} ~ ${checkOutDate}`}</p>
    </div>
    <div>
      <p>인원</p>
      <p>{`성인 ${rsvnInfo.adultCount}, 어린이 ${rsvnInfo.childCount}`}</p>
    </div>
  </div>
  )
}

export default NowInfoDefault