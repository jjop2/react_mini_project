import { useNavigate } from 'react-router-dom';
import './RoomInfo.css'

function RoomInfo({roomData, showStandard, showDeluxe, showSuite}) {
  // 새로고침 했을 때 비동기 불러오는 거 처리
  if (!roomData || roomData.length === 0) return null;

  const navigate = useNavigate();

  // 객실 리스트 배열
  const roomTypeList = [showStandard, showDeluxe, showSuite];

  // 객실 정보 틀
  function roomInfoCard(i) {
    return (
      <div className="roomInfoCard">

        <div className="roomIntroBox">
          <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${roomData[i].id}.png`} alt="" className="roomImg" />
          <div className="roomIntroContent">
            <h1>{roomData[i].name}</h1>
            <p>{roomData[i].catchphrase}</p>
          </div>
        </div>
        
        <div className="roomBodyBox">
          <div className="roomInfoItem-left">
            <div className="roomInfoContent">
              <h3>객실 정보</h3>
              <div className="roomInfoListWrap">
                <div className="roomInfoList">
                  <p>면적</p>
                  <p>{roomData[i].size}</p>
                </div>
                <div className="roomInfoList">
                  <p>침대 구성</p>
                  <p>{roomData[i].bed}</p>

                </div>
                <div className="roomInfoList">
                  <p>기준 인원</p>
                  <p>{`${roomData[i].count}명 (최대: ${roomData[i].max}명)`}</p>
                </div>
              </div>
            </div>
            
            <div className="roomInfoContent">
              <h3>객실 서비스</h3>
              <div className="roomService">
                {
                  roomData[i].service.map((data, index) => {
                    return (
                      <div key={index}>
                        <p>{data}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="roomInfoItem-right">
            {
              roomData[i].detail.map((data, index) => {
                return (
                  <div className="roomDetail" key={index}>
                    <p>
                      {data}
                    </p>
                  </div>
                )
              })
            }
            <div className="toRsvnBtn nextBtn" onClick={() => navigate('/reservation')}>
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