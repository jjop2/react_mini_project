import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RsvnPayNextBtn({rsvnInfo, setRsvnInfo, setTestStart, isOnline, isAllInfo, isAllcredit, isAllValid, rsvnPayInfo}) {
  const navigate = useNavigate();

  // 예약 완료 후 초기화용
  const resetRsvnInfo = {
    startDate: new Date(),
    endDate: new Date(),
    adultCount: 1,
    childCount: 0,
    selectedProduct: {},
    bedType: '더블',
    bkfAdult: 0,
    bkfChild: 0,
    bkfAdultAdd: 0,
    bkfChildAdd: 0,
    checkInDate: '',
    checkOutDate: '',
    stayNights: 0
  }

  return (
    <div className="rsvnPayNextBtn">
      <div className="preBtn" onClick={()=>navigate('/reservation/option')}>이전</div>
      
      <div className="nextBtn" onClick={()=>{
        setTestStart({
          lastName: true,
          firstName: true,
          email: true,
          phone: true,
          creditNum1: true,
          creditNum2: true,
          creditNum3: true,
          creditNum4: true,
          expirationMonth: true,
          expirationYear: true
        });
      
        if(isAllValid) {
          if(isOnline) {
            alert('결제 진행 화면 띄우기');
          }
          // 예약번호 생성
          const rsvnDateNum = new Date(Date.now()).toISOString().slice(2, 10).replace(/-/g, "");
          const rsvnRandomNum = String(Math.floor(Math.random()*10000)).padStart(4, '0');
          const rsvnNum = rsvnDateNum + rsvnRandomNum;
          
          const mergedPayInfo = {...rsvnPayInfo, rsvnNum, isOnline};

          // 예약 최종 결과 오브젝트 (예약옵션, 결제, 예약번호 등)
          const rsvnResult = {...rsvnInfo, ...mergedPayInfo};

          // 예약 최종 결과 로컬스토리지에 저장
          localStorage.setItem('rsvnResult', JSON.stringify(rsvnResult));

          // 사용자가 선택했던 예약 옵션(rsvnInfo) 초기화
          sessionStorage.setItem('rsvnInfo', JSON.stringify(resetRsvnInfo));
          setRsvnInfo(resetRsvnInfo);

          alert('예약이 완료되었습니다.');
          navigate('/reservation/result');
        } else {
          if(!isAllInfo)
            alert('예약자 정보를 다시 확인해주세요');
          else if(!isAllcredit)
            alert('결제 정보를 다시 확인해주세요');
          else
            alert('필수 항목에 모두 동의해야 합니다');
        }
      }}>예약하기</div>
    </div>
  )
}

export default RsvnPayNextBtn