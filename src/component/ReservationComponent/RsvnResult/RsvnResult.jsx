import './RsvnResult.css'

function RsvnResult() {
  const rsvnResult = JSON.parse(localStorage.getItem('rsvnResult'));

  return (
    <div className="rsvnResult">
      
      <div className="rsvnSummaryCard">
        <h3>예약 정보</h3>
        <div className="rsvnSummaryCardItem">
          <h4>예약번호</h4>
          {rsvnResult.rsvnNum}
        </div>
        <div className="rsvnSummaryCardItem">
          <div className="rsvnSummaryCardItemBox">
            <h4>예약자명</h4>
            {rsvnResult.lastName}
            {rsvnResult.firstName}
          </div>
          <div className="rsvnSummaryCardItemBox">
            <h4>연락처</h4>
            {rsvnResult.phone}
          </div>
        </div>
        <div className="rsvnSummaryCardItem">
          <div className="rsvnSummaryCardItemBox">
            <h4>체크인</h4>
            {rsvnResult.checkInDate}
          </div>
          <div className="rsvnSummaryCardItemBox">
            <h4>체크아웃</h4>
            {`${rsvnResult.checkOutDate} (${rsvnResult.stayNights}박)`}
          </div>
        </div>
      </div>

      <div className="rsvnResultCard">
        <h3>객실 정보</h3>
        <div className="rsvnRoom_title">
          <div className="rsvnSummaryCardItemBox">
            <h4>객실 유형</h4>
            {rsvnResult.roomType}
          </div>
        </div>
        <div className="rsvnRoom_details">
          {rsvnResult.bedType}
          성인 {rsvnResult.adultCount}
          어린이 {rsvnResult.childCount}
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnPackInfo_name">
          {rsvnResult.selectedProduct.name}
        </div>
        <div className="rsvnPackInfo_benefits">
          {rsvnResult.summaryBenefit}
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnBftInfo_list">
          성인 {rsvnResult.bkfAdult}
          성인 추가 {rsvnResult.bkfAdultAdd}
          어린이 {rsvnResult.bkfChild}
          어린이 추가 {rsvnResult.bkfChildAdd}
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnPaymentInfo_method">
          {rsvnResult.isOnline}
        </div>
        <div className="rsvnPaymentInfo_total">
          {rsvnResult.totalPayment}
        </div>
      </div>
    </div>
  )
}

export default RsvnResult