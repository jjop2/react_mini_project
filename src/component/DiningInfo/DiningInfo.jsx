import './DiningInfo.css'

function DiningInfo({diningkData}) {

  function diningInfoCard(dining) {
    const menuTitle = ["주요 메뉴", "제공 메뉴"];

    return (
      <div className="diningInfoCard">
        
        <div className="diningInfoCardBox">
          <div className="diningInfoContent-left">
            <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${dining.id}.png`} alt="" className="diningImg" />
            <h2>{dining.name}</h2>
            <p>{dining.detail}</p>
          </div>

          <div className="diningInfoContentl-right">
            <div className="diningInfoList">
              <h3>운영 시간</h3>
              {
                dining.id === "liv-restaurant"
                  ? dining.time.map((data, i) => {
                      return (
                        <div className='livTime' key={i}>
                          <p>{data}</p>
                        </div>
                      )
                    })
                  : <p>{dining.time}</p>
              }
            </div>
            <div className="diningInfoList">
              <h3>좌석 수</h3>
              <p>{dining.seat}</p>
            </div>
            <div className="diningInfoList">
              <h3>이용 안내</h3>
              <p>{dining.guide}</p>
            </div>
            <div className="diningInfoList">
              <h3>{dining.id === "liv-restaurant" ? menuTitle[0] : menuTitle[1]}</h3>
              {
                dining.menu.map((data, i) => {
                  return (
                    <div key={i}>
                      <p>{data}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="diningInfo">
      <div className="diningInfoWrap">
        {
          diningkData.map((data, i) => {
            return (
              <div key={i}>
                {diningInfoCard(data)}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DiningInfo