import { useEffect, useState } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  
  const [showBurger, setShowBurger] = useState(false);

  // 햄버거 메뉴 오픈 시 스크롤 금지
  useEffect(()=>{
    document.body.style.overflow = showBurger ? 'hidden' : 'auto';
  }, [showBurger])

  // pc 사이즈로 변경 시 햄버거 자동 닫힘
  window.addEventListener("resize", () => {
    if(window.innerWidth>=768)
      setShowBurger(false);
  })

  return (
    <div className='header'>

      <div className="nav">
        <div className="leftMenu">
          <i className="fa-solid fa-bars burgerIcon" onClick={()=>setShowBurger(!showBurger)}></i>
        </div>

        <div className="logo" onClick={() => {
          setShowBurger(false);
          navigate('/');
        }} style={{cursor: 'pointer'}}>
          <h1>HOTEL MIREN</h1>
          <p>Stillness by the Waters</p>
        </div>
        
        <div className="rightMenu">
          <p className='rightMenuItem'>로그인</p>
          <p className='rightMenuItem' onClick={()=>navigate('/reservation')}>예약하기</p>
          <p className='reserve-small' onClick={()=>navigate('/reservation')}>예약</p>
        </div>
      </div>

      {/* pc 사이즈용 네비게이션바 */}
      <div className="subNav">
        <ul className='subNavList'>
          <li>Hotel Miren</li>
          <li onClick={()=>navigate('/event')}>이벤트</li>
          <li onClick={()=>navigate('/room')}>객실</li>
          <li onClick={()=>navigate('/dining')}>다이닝</li>
          <li>예약 조회</li>
        </ul>
      </div>

      {/* 모바일 사이즈용 햄버거 버튼 */}
      <div className={`${showBurger ? 'burgerMenu show' : ''}`} onClick={()=>{
        setShowBurger(!showBurger);
      }}>
      </div>
      <ul className={`burgerMenuList  ${showBurger ? 'show' : ''}`}>
        <div className='burger-logIn'>
          <h3>로그인</h3>
        </div>
        <li onClick={() => {
          setShowBurger(false);
          
        }}>Hotel Miren</li>
        <li onClick={() => {
          setShowBurger(false);
          navigate('/event');
        }}>이벤트</li>
        <li onClick={() => {
          setShowBurger(false);
          navigate('/room');
        }}>객실</li>
        <li onClick={() => {
          setShowBurger(false);
          navigate('/dining');
        }}>다이닝</li>
        <li onClick={() => {
          setShowBurger(false);

        }}>예약 조회</li>
      </ul>

    </div>
  )
}

export default Header;