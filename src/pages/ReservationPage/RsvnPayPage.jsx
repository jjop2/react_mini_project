import './RsvnPayPage.css'
import { useEffect, useState } from 'react';
import NowInfoPay from '../../component/ReservationComponent/RsvnNowInfo/NowInfoPay';
import RsvnPay from '../../component/ReservationComponent/RsvnPay/RsvnPay';
import RsvnPayNextBtn from '../../component/ReservationComponent/RsvnNextBtn/RsvnPayNextBtn';

function RsvnPayPage({rsvnInfo, setRsvnInfo, checkInDate, checkOutDate, totalGuestCount, packData}) {
  // 유효성 검사 시작용
  const [testStart, setTestStart] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
    creditNum1: false,
    creditNum2: false,
    creditNum3: false,
    creditNum4: false,
    expirationMonth: false,
    expirationYear: false
  });

  // 상태 확인
  const [isRight, setIsRight] = useState({
    lastName: false,
    firstName: false,
    email: false,
    phone: false,
    creditNum1: false,
    creditNum2: false,
    creditNum3: false,
    creditNum4: false,
    expirationMonth: false,
    expirationYear: false,
    agreeInfo: false,
    agreeAge: false
  });

  
  // 결제 방식 탭
  const [isOnline, setIsOnline] = useState(true);

  // 다음 페이지로 넘기기 허용
  const [isAllInfo, setIsAllInfo] = useState(false);
  const [isAllcredit, setIsAllcredit] = useState(false);
  const [isAllAgree, setIsAllAgree] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);
  
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
            setIsRight={setIsRight}
            setIsAllInfo={setIsAllInfo}
            setIsAllcredit={setIsAllcredit}
            setIsAllAgree={setIsAllAgree}
            setIsAllValid={setIsAllValid}
            isOnline={isOnline}
            setIsOnline={setIsOnline}

            isAllInfo={isAllInfo}
            isAllcredit={isAllcredit}
            isAllAgree={isAllAgree}
            isAllValid={isAllValid}

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
            setTestStart={setTestStart}
            isOnline={isOnline}
            isAllInfo={isAllInfo}
            isAllcredit={isAllcredit}
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