import { useState } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">

      <div className="nav">
        <div className="leftMenu"></div>
        <div className="logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <h1>HOTEL MIREN</h1>
        </div>
        <div className="rightMenu">
          <p>로그인</p>
          <p>예약하기</p>
        </div>
      </div>
      <div className="subNav">
        <p className='subNavList'>Hotel Miren</p>
        <p className='subNavList'>이벤트</p>
        <p className='subNavList'>객실</p>
        <p className='subNavList'>다이닝</p>
        <p className='subNavList'>예약 조회</p>
      </div>

    </div>
  )
}

export default Header;