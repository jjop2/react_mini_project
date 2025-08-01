import './RoomInfo.css'

function RoomInfo({roomData, showStandard, showDeluxe, showSuite}) {
  // 새로고침 했을 때 비동기 불러오는 거 처리
  if (!roomData || roomData.length === 0) return null;


  // 객실 리스트 배열
  const roomTypeList = [showStandard, showDeluxe, showSuite];

  // 객실 정보 틀
  function roomInfoCard(i) {
    return (
      <div className="roomInfoCard">

        <div className="roomIntroBox">
          <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${roomData[i].id}.png`} alt="" className="roomInfoImg" />
          <div className="roomIntroContent">
            <h1>{roomData[i].name}</h1>
            <p>{roomData[i].catchphrase}</p>
          </div>
        </div>
        
        <div className="roomBodyBox">
          <div className="roomInfoItem-left">
            <div className="roomDetail">
              <p>{roomData[i].detail}</p>
            </div>
            <div className="roomService">
              <h4>객실 서비스</h4>
              {roomData[i].service}
            </div>
          </div>

          <div className="roomInfoItem-right">
            <div className="roomInfoContent">
              <p>{`면적 : ${roomData[i].size}`}</p>
              <p>{`침대 구성 : ${roomData[i].bed}`}</p>
              <p>{`기준 인원 : ${roomData[i].count} (최대 : ${roomData[i].max})`}</p>
              <div>도면</div>
            </div>
            <div className="toRsvnBtn">
              예약하기
            </div>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="roomInfo">
      
      <div className="roomInfoWrap">
        {
          roomTypeList.map((data, i) => {
            return (
              <div className={`${data ? '' : 'hide'}`} key={i}>
                {roomInfoCard(i)}
              </div>
            )
          })

        }
      </div>

    </div>
  )
}

export default RoomInfo