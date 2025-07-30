import './NowInfoDefault.css'

function NowInfoDefault({rsvnInfo, checkInDate, checkOutDate}) {

  return (
  <div className="rsvnInfoNow">
    <div className="rsvnInfoWrap">
      <div className='infoItem'>
        <p>날짜</p>
        <p>{`${checkInDate} ~ ${checkOutDate}`}</p>
      </div>
      <div className='infoItem'>
        <p>인원</p>
        <p>{`성인 ${rsvnInfo.adultCount}, 어린이 ${rsvnInfo.childCount}`}</p>
      </div>
    </div>
  </div>
  )
}

export default NowInfoDefault