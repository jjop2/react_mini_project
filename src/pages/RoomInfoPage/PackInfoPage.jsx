import './PackInfoPage.css'

function PackInfoPage() {

  // 패키지 목록 틀 (예약에서 썼던 거. 혜택 목록 쓴 거 재활용 하려고 복붙함)
  function packCard(pack) {
    return (
      <div className="cardBox">
        <img src={`https://raw.githubusercontent.com/jjop2/react_mini_project_data/main/image/${pack.title}.png`} alt="" />
        <div className="packInfo">
          <h2>{pack.title}</h2>
          <p>{`객실 유형 : ${pack.roomType}`}</p>
          {
            pack.benefit.map((benefitContent, i)=>{
              return (
                <div key={i}>
                  <p>- {benefitContent}</p>
                </div>
              )
            })
          }
          <h3>{`${formatPrice(pack.price)}원`}</h3>
        </div>
        <div className="selectBtn" onClick={()=>{
          updateInfo('selectedProduct', {
            type: 'package',
            name: pack.title,
            max: pack.max,
            price: pack.price
          });
          navigate('/reservation/option');
        }}>선택하기 &gt;</div>
      </div>
    )
  }

  return (
    <div className="packInfo">
      
    </div>
  )
}

export default PackInfoPage