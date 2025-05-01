import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosHome } from 'react-icons/io';

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
  background-color: #f3f2f2;
`;
const GoLink = styled(Link)`
    color: rgb(12, 12, 12);
    font-size: 16px ;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

const Header = ({children}) => {
  return (

    <div>
      <Nav>
        <GoLink to={'/'} style={{ marginRight: '200px', marginLeft: `30px`,    fontSize: '20px' }}>
          <IoIosHome size={45} />
        </GoLink>
        <GoLink to={'/login'} style={{justifyContent: 'flex-start',marginLeft: '1450px'}}>로그인 </GoLink>
        <GoLink to={'/registration'} style={{marginRight: '30px',marginLeft: '30px'}}>회원가입 </GoLink>
      </Nav>
      <main>{children}</main>
    </div>
    

  );
};

export default Header;
