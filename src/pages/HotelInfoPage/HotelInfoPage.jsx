import HotelInfo from '../../component/HotelInfo/HotelInfo'
import './HotelInfoPage.css'

function HotelInfoPage() {
  
  return (
    <div className="hotelInfoPage">
      <div className="pageWrap">

        <div className="pageTitle">
          <h2>HOTEL MIREN</h2>
        </div>

        <div className="pageBody">
          <HotelInfo />
        </div>

      </div>
    </div>
  )
}

export default HotelInfoPage