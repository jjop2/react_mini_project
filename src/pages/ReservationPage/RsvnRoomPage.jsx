import './RsvnRoomPage.css'
import NowInfoDefault from '../../component/ReservationComponent/RsvnNowInfo/NowInfoDefault';
import RsvnRoomList from '../../component/ReservationComponent/RsvnRoomList/RsvnRoomList';

function RsvnRoomPage({rsvnInfo, setRsvnInfo, totalGuestCount, roomData, packData}) {
  const preURL = '/reservation';
  const nextURL = '/reservation/option';
  

  return (
    <div className="rsvnRoomPage">
      <div className="rsvnWrap2">

        <div className="roomLayout-left">
          {/* 패키지, 객실 목록 */}
          <RsvnRoomList
            setRsvnInfo={setRsvnInfo}
            totalGuestCount={totalGuestCount}
            roomData={roomData}
            packData={packData}
          />
        </div>

        <div className="roomLayout-right">
          {/* 예약 선택 현황 */}
          <NowInfoDefault
            rsvnInfo={rsvnInfo}
            preURL={preURL}
            nextURL={nextURL}
          />
        </div>

      </div>
    </div>
  )
}

export default RsvnRoomPage