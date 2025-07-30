function NowInfoPay({rsvnInfo, checkInDate, checkOutDate, totalGuestCount}) {
  // rsvnInfo 구조 분해
  const {startDate, endDate, adultCount, childCount, selectedProduct, bedType, bktAdult, bktChild, bkfAdultAdd, bkfChildAdd} = rsvnInfo;

  // 투숙 기간 구하기
  const stayNights = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;

  // 가격 세자리마다 콤마 함수
  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 총 결제 금액
  const total = selectedProduct.price*stayNights + bktAdult*28000 + bktChild*18000 + bkfAdultAdd*28000 + bkfChildAdd*18000;
  

  return (
    <div className="rsvnInfoNow">
        <div>
          <p>날짜</p>
          <p>{`${checkInDate} ~ ${checkOutDate}`}</p>
        </div>
        <div>
          <p>인원</p>
          <p>{`성인 ${adultCount}, 어린이 ${childCount}`}</p>
        </div>
        <div>
          <p>{selectedProduct.name}</p>
          <p className={`${selectedProduct.max===3 ? 'hide' : ''}`}>{bedType}</p>
        </div>

        {/* 총 결제 금액 */}
        <div className="paymentMain">
          <p>총 결제 금액</p>
          <p>{`${formatPrice(total)}원`}</p>
        </div>

        {/* 금액 상세 */}
        <div className="paymentDetail">
          <div className="roomCharge">
            <p>날짜</p>
            <p>{`${selectedProduct.name} x ${stayNights}박`}</p>
            <p>{`${formatPrice(selectedProduct.price*stayNights)}원`}</p>
          </div>
          <div className={`bkfCharge ${selectedProduct.type==='room' ? '' : 'hide'}`}>
            <div className={`${bktAdult!==0 ? '' : 'hide'}`}>
              <p>{`조식 요금 성인x${bktAdult}`}</p>
              <p>{`${formatPrice(bktAdult * 28000)}원`}</p>
            </div>
            <div className={`${bktChild!==0 ? '' : 'hide'}`}>
              <p>{`조식 요금 어린이x${bktChild}`}</p>
              <p>{`${formatPrice(bktChild * 18000)}원`}</p>
            </div>
          </div>
          <div className={`bkfAddCharge ${totalGuestCount===3 ? '' : 'hide'}`}>
            <div className={`${bkfAdultAdd!==0 ? '' : 'hide'}`}>
              <p>{`조식 추가 요금 성인x${bkfAdultAdd}`}</p>
              <p>{`${formatPrice(bkfAdultAdd * 28000)}원`}</p>
            </div>
            <div className={`${bkfChildAdd!==0 ? '' : 'hide'}`}>
              <p>{`조식 추가 요금 어린이x${bkfChildAdd}`}</p>
              <p>{`${formatPrice(bkfChildAdd * 18000)}원`}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default NowInfoPay