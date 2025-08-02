import { useNavigate } from "react-router-dom";

function RsvnPayNextBtn({setRsvnInfo, setTestStart, isOnline, isAllInfo, isAllcredit, isAllValid}) {
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
    bkfChildAdd: 0
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
            alert('예약이 완료되었습니다.');
              sessionStorage.setItem('rsvnInfo', JSON.stringify(resetRsvnInfo));
              setRsvnInfo(resetRsvnInfo);
              navigate('/');
            } else {
              alert('예약이 완료되었습니다.');
              sessionStorage.setItem('rsvnInfo', JSON.stringify(resetRsvnInfo));
              setRsvnInfo(resetRsvnInfo);
              navigate('/');
          }
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