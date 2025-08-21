import './RsvnPayPage.css'
import { useEffect, useState } from 'react';
import NowInfoPay from '../../component/ReservationComponent/RsvnNowInfo/NowInfoPay';
import RsvnPay from '../../component/ReservationComponent/RsvnPay/RsvnPay';
import { useValidation } from '../../hooks/useValidation';

function RsvnPayPage({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, packData}) {
  // 유효성 검사
  const { isRight, testStart, validate, startTest, isAllValid } = new useValidation([
    "lastName", "firstName", "email", "phone", "creditNum1", "creditNum2", "creditNum3", "creditNum4", "expirationMonth", "expirationYear", "checkAgreeInfo", "checkAgreeAge"
  ]);
  
  // 유효성 검사 그룹
  const infoFields = ["lastName", "firstName", "email", "phone"];
  const creditFields = ["creditNum1", "creditNum2", "creditNum3", "creditNum4", "expirationMonth", "expirationYear"];
  const isAllInfo = infoFields.every(field => isRight[field]);
  const isAllCredit = creditFields.every(field => isRight[field]);
 
  // 결제 방식 탭
  const [isOnline, setIsOnline] = useState(true);
  
  // 입력한 예약자 정보 저장
  const [rsvnPayInfo, setRsvnPayInfo] = useState({
    lastName: '',
    firstName: '',
    phone: 0,
    isOnline: true,
    totalPayment: 0,
    summaryBenefit: '',
    roomType: ''
  })
  
  // 패키지별 혜택 요약, 객실 정보 받아오기
  const findPack = packData.find((event) => event.title === rsvnInfo.selectedProduct.name);

  useEffect(() => {
    if(findPack && rsvnInfo.selectedProduct.type === 'package') {
      setRsvnPayInfo(prev => ({
        ...prev,
        summaryBenefit: findPack.summaryBenefit,
        roomType: findPack.roomType
      }))
    } else {
      setRsvnPayInfo(prev => ({...prev, roomType: rsvnInfo.selectedProduct.name}))
    }
  }, [rsvnInfo.selectedProduct, packData])
  
  return (
    <div className="rsvnPayPage">
      <div className="rsvnWrap2">

        <div className="roomLayout-left">
          {/* 정보 입력 본문 */}
          <RsvnPay
            testStart={testStart}
            isRight={isRight}
            validate={validate}
            isOnline={isOnline}
            setIsOnline={setIsOnline}
            setRsvnPayInfo={setRsvnPayInfo}
          />
        </div>
      
        <div className="roomLayout-right">
          {/* 예약 선택 현황 */}
          <NowInfoPay
            rsvnInfo={rsvnInfo}
            setRsvnInfo={setRsvnInfo}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            totalGuestCount={totalGuestCount}
            startTest={startTest}
            isOnline={isOnline}
            isAllInfo={isAllInfo}
            isAllCredit={isAllCredit}
            isAllValid={isAllValid}

            rsvnPayInfo={rsvnPayInfo}
            setRsvnPayInfo={setRsvnPayInfo}
          />
        </div>
        
      </div>
    </div>
  )
}

export default RsvnPayPage