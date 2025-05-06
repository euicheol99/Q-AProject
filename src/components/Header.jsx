import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { CiBoxList } from 'react-icons/ci';
import { FaMoon, FaRegMoon } from 'react-icons/fa';
import useUserStore from '../store/UserStore';

const Header = ({ children, toggleTheme, isDark }) => {
  const [sidebar, setSidebar] = useState(false);
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loginUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const toggleSidebar = () => setSidebar((prev) => !prev);

  const handleLogout = () => {
    sessionStorage.removeItem('loginUser');
    clearUser();
    navigate('/');
  };

  return (
    <div>
      <Nav>
        <GoLink as="div" onClick={toggleSidebar} style={{ marginRight: '200px', marginLeft: '30px' }}>
          <CiBoxList size={45} />
        </GoLink>

        <div style={{ marginLeft: 'auto', marginRight: '30px', display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ marginRight: '10px' }}>{user.name}님, 환영합니다.</span>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <GoLink to="/login" style={{ marginRight: '15px' }}>로그인</GoLink>
              <GoLink to="/registration">회원가입</GoLink>
            </>
          )}
          <ThemeButton onClick={toggleTheme}>
            {isDark ? <FaRegMoon size={20} /> : <FaMoon size={20} />}
          </ThemeButton>
        </div>
      </Nav>

      <Overlay open={sidebar} onClick={toggleSidebar} />
      <Sidebar open={sidebar}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <SideMenu><GoLink to="/">홈으로</GoLink></SideMenu>
          {user && <SideMenu><GoLink to={`/user/${user.id}`}>내정보</GoLink></SideMenu>}
          <SideMenu><GoLink to="/postform">글쓰기</GoLink></SideMenu>
        </ul>
      </Sidebar>

      <main>{children}</main>
    </div>
  );
};

export default Header;

const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #e9e8e8;
  z-index: 10;
`;

const GoLink = styled(Link)`
  color: rgb(12, 12, 12);
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
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
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 5;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 4;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const SideMenu = styled.li`
  display: flex;
  align-items: center;
  height: 60px;
`;

const LogoutButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #5f0680;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 15px;
  display: flex;
  align-items: center;
`;
