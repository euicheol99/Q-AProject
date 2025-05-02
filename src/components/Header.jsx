import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CiBoxList } from "react-icons/ci";
import { useState } from 'react';
import { FaMoon, FaRegMoon } from "react-icons/fa";
 

const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 70px;
  background-color: #e9e8e8;
`;

const GoLink = styled(Link)`
    color: rgb(12, 12, 12);
    font-size: 20px ;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 200px;
  height: calc(100vh - 70px);
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  padding: 20px;
  z-index: 5;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 70px; /* 헤더 높이만큼 내려감 */
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: rgba(0, 0, 0, 0.4); /* 어두운 반투명 배경 */
  z-index: 4;
  display: ${({ open }) => open ? 'block' : 'none'};
`;

const SideMenu = styled.li`
  display: flex;
  height: 60px;
`



const Header = ({children,toggleTheme}) => {
  const [sidebar,setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(prev => !prev);
  }


  return (
      <div>
      <Nav>
        <GoLink onClick={toggleSidebar}  style={{ marginRight: '200px', marginLeft: `30px`,    fontSize: '20px' }}>
          <CiBoxList size={45} />
        </GoLink>
        <GoLink to={'/login'} style={{justifyContent: 'flex-start',marginLeft: '1350px',fontSize: '16px',fontWeight:'normal'}}>로그인 </GoLink>
        <GoLink to={'/registration'} style={{marginRight: '30px',marginLeft: '15px',fontSize: '16px',fontWeight:'normal'}}>회원가입 </GoLink>  
        <button onClick={toggleTheme}><FaMoon />/<FaRegMoon/></button>
      </Nav>

      <Overlay open={sidebar} onClick={toggleSidebar} />

      <Sidebar open={sidebar}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <SideMenu><GoLink to="/">홈으로</GoLink></SideMenu>
          <SideMenu><GoLink to="/user/:id">내정보</GoLink></SideMenu>
          <SideMenu><GoLink to="/page2">페이지2</GoLink></SideMenu>
          <SideMenu><GoLink to="/page3">페이지3</GoLink></SideMenu>
        </ul>
      </Sidebar>
      <main>{children}</main>
      </div>
    
  );
};

export default Header;
