import { use, useState } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  
  const [showSubNav, setShowSubNav] = useState(true);
  const [showBurger, setShowBurger] = useState(false);

  return (
    <div className="header">

      <div className="nav">
        <div className="leftMenu">
          <i class="fa-solid fa-bars burgerIcon" onClick={()=>{
            setShowBurger(!showBurger);
          }}></i>
        </div>
        <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <h1>HOTEL MIREN</h1>
        </div>
        <div className="rightMenu">
          <p className='logIn'>로그인</p>
          <p className='reserve'>예약하기</p>
          <p className="reserve-small">예약</p>
        </div>
      </div>
      <div className="subNav">
        <ul className='subNavList'>
          <li>Hotel Miren</li>
          <li>이벤트</li>
          <li>객실</li>
          <li>다이닝</li>
          <li>예약 조회</li>
        </ul>

      </div>

      {/* 클릭하면 show 추가되는 거 적용하기 */}
      <div className="burgerMenu">
        <ul className='burgerMenuList'>
          <li>Hotel Miren</li>
          <li>이벤트</li>
          <li>객실</li>
          <li>다이닝</li>
          <li>예약 조회</li>
        </ul>
      </div>

    </div>
  )
}

export default Header;