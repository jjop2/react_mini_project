import './RsvnInfoBox.css'

function RsvnInfoBox() {

  return (
    <div className="rsvnInfo">

      <div className="rsvnNotice">
        <h4 className="rsvnNoticeTitle">안내사항</h4>
        <ul className="rsvnNoticeList">
          <li>체크인: 15:00 이후 / 체크아웃: 11:00까지</li>
          <li>조식 운영 시간: 오전 7시 ~ 10시</li>
          <li>투숙객 무료 주차 (객실당 1대)</li>
          <li>취소 및 변경은 체크인 3일 전까지 무료입니다.</li>
          <li>전 객실 금연, 반려동물 동반 불가</li>
        </ul>
      </div>

    </div>
  )
}

export default RsvnInfoBox