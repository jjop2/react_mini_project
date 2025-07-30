import { useNavigate } from 'react-router-dom'
import './RsvnNextBtn.css'

function RsvnNextBtn({rsvnInfo, preURL, nextURL}) {
  const navigate = useNavigate();

  return (
    <div className="rsvnNextBtn">
      <div className="preBtn" onClick={()=>navigate(`${preURL}`)}>&lt; 이전</div>
      <div className={
        `nextBtn
        ${rsvnInfo.selectedProduct.type===undefined
          ? 'hide'
          : ''
        }`
      } onClick={()=>navigate(`${nextURL}`)}>다음 &gt;</div>
    </div>
  )
}

export default RsvnNextBtn