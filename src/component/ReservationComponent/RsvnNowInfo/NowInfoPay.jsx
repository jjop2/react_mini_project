import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './NowInfoPay.css'
import { useState } from 'react';
import RsvnPayNextBtn from '../RsvnNextBtn/RsvnPayNextBtn';

function NowInfoPay({rsvnInfo, checkInDate, checkOutDate, totalGuestCount, setTestStart, isOnline, isAllInfo, isAllcredit, isAllValid}) {
  // rsvnInfo 구조 분해
  const {startDate, endDate, adultCount, childCount, selectedProduct, bedType, bkfAdult, bkfChild, bkfAdultAdd, bkfChildAdd} = rsvnInfo;

  // 투숙 기간 구하기
  const stayNights = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;

  // 가격 세자리마다 콤마 함수
  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // 총 결제 금액
  const total = selectedProduct.price*stayNights + bkfAdult*28000 + bkfChild*18000 + bkfAdultAdd*28000 + bkfChildAdd*18000;

  // 결제 내역 상세보기 버튼
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  

  return (
    <div className="rsvnInfoNow">
      <div className="rsvnInfoWrap">
        <div className="infoBox">

          <div className="infoItem">
            <p>날짜</p>
            <p>{`${checkInDate} ~ ${checkOutDate}`}</p>
          </div>
          <div className="infoItem">
            <p>인원</p>
            <p>{`성인 ${adultCount}, 어린이 ${childCount}`}</p>
          </div>
          <div className="infoItem">
            <p>객실</p>
            <span>{`${selectedProduct.name} `}</span>
            <span className={`${selectedProduct.max===3 ? 'hide' : ''}`}>{`(${bedType})`}</span>
          </div>

          {/* 총 결제 금액 */}
          <div className="paymentMain" onClick={() => setIsDetailOpen(!isDetailOpen)}>
            <div className="paymentText">
              <p>총 결제 금액</p>
              <h2>{`${formatPrice(total)}원`}</h2>
            </div>
            <div className='toPayDetail'>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>

          {/* 금액 상세 */}
          <div className={`paymentDetail ${isDetailOpen ? '' : 'hide'}`}>
            <div className="payDetailBox payDetailBox-top">
              <div className="payDetailItem">
                <p>{`${selectedProduct.name} x ${stayNights}박`}</p>
              </div>
              <div className="payDetailPrice">
                <p>{`${formatPrice(selectedProduct.price*stayNights)}원`}</p>
              </div>
            </div>
            <div className={`payDetailBox-top-border ${
              bkfAdult!==0
              || bkfChild!==0
              || bkfAdultAdd!==0
              || bkfChildAdd!==0
               ? '' : 'hide'
              }`} />
            <div className={selectedProduct.type==='room' ? '' : 'hide'}>
              <div className={`payDetailBox ${bkfAdult!==0 ? '' : 'hide'}`}>
                <div className="payDetailItem payDetailItem-bottom">
                  <p>{`조식 성인 x ${bkfAdult}`}</p>
                </div>
                <div className="payDetailPrice payDetailPrice-bottom">
                  <p>{`${formatPrice(bkfAdult * 28000)}원`}</p>
                </div>
              </div>
              <div className={`payDetailBox ${bkfChild!==0 ? '' : 'hide'}`}>
                <div className="payDetailItem payDetailItem-bottom">
                  <p>{`조식 어린이 x ${bkfChild}`}</p>
                </div>
                <div className="payDetailPrice payDetailPrice-bottom">
                  <p>{`${formatPrice(bkfChild * 18000)}원`}</p>
                </div>
              </div>
            </div>

            <div className={totalGuestCount===3 ? '' : 'hide'}>
              <div className={`payDetailBox ${bkfAdultAdd!==0 ? '' : 'hide'}`}>
                <div className='payDetailItem payDetailItem-bottom'>
                  <p>{`조식 추가 성인 x ${bkfAdultAdd}`}</p>
                </div>
                <div className='payDetailPrice payDetailPrice-bottom'>
                  <p>{`${formatPrice(bkfAdultAdd * 28000)}원`}</p>
                </div>
              </div>
              <div className={`payDetailBox ${bkfChildAdd!==0 ? '' : 'hide'}`}>
                <div className='payDetailItem payDetailItem-bottom'>
                  <p>{`조식 추가 어린이 x ${bkfChildAdd}`}</p>
                </div>
                <div className='payDetailPrice payDetailPrice-bottom'>
                  <p>{`${formatPrice(bkfChildAdd * 18000)}원`}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="btnBox">
          {/* 이동 버튼 */}
          <RsvnPayNextBtn
            setTestStart={setTestStart}
            isOnline={isOnline}
            isAllInfo={isAllInfo}
            isAllcredit={isAllcredit}
            isAllValid={isAllValid}
          />
        </div>

      </div>
    </div>
  )
}

export default NowInfoPay