import DiningInfo from '../../component/DiningInfo/DiningInfo'
import './DiningInfoPage.css'

function DiningInfoPage({diningkData}) {
  return (
    <div className="diningInfoPage">
      <div className="pageWrap">

        <div className="pageTitle">
          <h2>다이닝</h2>
        </div>

        <div className="pageBody">
          <DiningInfo
            diningkData={diningkData}
          />
        </div>

      </div>
    </div>
  )
}

export default DiningInfoPage