import { formatPrice } from '../../../utils/format';
import RsvnInfoBox from '../../RsvnInfoBox/RsvnInfoBox';
import './RsvnResult.css'

function RsvnResult() {
  const rsvnResult = JSON.parse(localStorage.getItem('rsvnResult'));

  // 투숙 총 인원
  const totalCount = rsvnResult.adultCount + rsvnResult.childCount;

  return (
    <div className="rsvnResult">
      
      <div className="rsvnResultCard">
        <div className="rsvnResultTitle">
          <h3>예약 정보</h3>
        </div>
        <div className="rsvnResultCardItem">
          <h4>예약번호</h4>
          <p>{rsvnResult.rsvnNum}</p>
        </div>
        <div className="rsvnResultCardItem">
            <h4>예약자명</h4>
            <p>{rsvnResult.lastName} {rsvnResult.firstName}</p>
            <h4>연락처</h4>
            <p>{rsvnResult.phone}</p>
        </div>
        <div className="rsvnResultCardItem">
            <h4>체크인</h4>
            <p>{rsvnResult.checkInDate}</p>
            <h4>체크아웃</h4>
            <p>{`${rsvnResult.checkOutDate} (${rsvnResult.stayNights}박)`}</p>
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnResultTitle">
          <h3>객실</h3>
        </div>
        <div className="rsvnResultCardItem">
          <h4>객실 유형</h4>
          <p>
            {rsvnResult.roomType}
            <span>{totalCount <= 2 ? ` (${rsvnResult.bedType})` : ''}</span>
          </p>
        </div>
        <div className='rsvnResultCardItem'>
          <h4>투숙 인원</h4>
          <p>{rsvnResult.adultCount > 0 ? `성인 : ${rsvnResult.adultCount}명` : ''}</p>
          <p>{rsvnResult.childCount > 0 ? `어린이 : ${rsvnResult.childCount}명` : ''}</p>
        </div>
      </div>

      <div className={`rsvnResultCard ${rsvnResult.selectedProduct.type == 'package' ? '' : 'hide'}`}>
        <div className="rsvnResultTitle">
          <h3>패키지</h3>
        </div>
        <div className="rsvnResultCardItem">
          <h4>상품명</h4>
          <p>{rsvnResult.selectedProduct.name}</p>
        </div>
        <div className="rsvnResultCardItem">
          <h4>포함 혜택</h4>
          <p>{rsvnResult.summaryBenefit}</p>
          <p className="messageBox2">*패키지 혜택은 2인 기준입니다.</p>
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnResultTitle">
          <h3>조식</h3>
        </div>
        <div className="rsvnResultCardItem">
          <h4>조식 인원</h4>

          <div className={rsvnResult.selectedProduct.type == 'room' ? '' : 'hide'}>
            <p>
              {`성인 : ${rsvnResult.bkfAdult + rsvnResult.bkfAdultAdd}명`}
            </p>
          </div>
          <div className={rsvnResult.selectedProduct.type == 'package' ? '' : 'hide'}>
            <p>
              {`성인 : ${rsvnResult.adultCount}명 `}
              <span>
                ( 패키지 {rsvnResult.adultCount} {rsvnResult.bkfAdultAdd > 0 ? `+ 추가 ${rsvnResult.bkfAdultAdd}` : ''})
              </span>
            </p>
          </div>

          <div className={rsvnResult.selectedProduct.type == 'room' ? '' : 'hide'}>
            <p>
              {rsvnResult.bkfChild + rsvnResult.bkfChildAdd > 0 ? `어린이 : ${rsvnResult.bkfChild + rsvnResult.bkfChildAdd}명` : ''}
            </p>
          </div>
          <div className={rsvnResult.selectedProduct.type == 'package' ? '' : 'hide'}>
            <p>
              {`어린이 : ${rsvnResult.childCount}명 `}
              <span>
                ( 패키지 {rsvnResult.childCount} {rsvnResult.bkfChildAdd > 0 ? `+ 추가 ${rsvnResult.bkfChildAdd}` : ''})
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="rsvnResultCard">
        <div className="rsvnResultTitle">
          <h3>결제</h3>
        </div>
        <div className="rsvnResultCardItem">
          <h4>총 결제 금액</h4>
          <p>{formatPrice(rsvnResult.totalPayment)}원</p>
        </div>
        <div className="rsvnResultCardItem">
          <h4>결제 수단</h4>
          <p>{rsvnResult.isOnline ? '온라인 사전 결제(완료)' : '현장 결제(예정)'}</p>
        </div>
      </div>

      <RsvnInfoBox />

    </div>
  )
}

export default RsvnResult