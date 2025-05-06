import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false); 

  const handleLogin = async (e) => {
    
  
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          userId,
          password,
        },
      });
  
      const users = response.data;
  
      if (users.length > 0) {
        const user = users[0];
  
        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("loginUser", JSON.stringify(user)); // 전체 저장
  
        setLoginCheck(false);
        navigate('/');
      } else {
        setLoginCheck(true);
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      setLoginCheck(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>로그인</Title>
        <form >
          <InputLine>
            <Input type='text' placeholder="아이디를 입력해주세요." onChange={(e) => setUserId(e.target.value)} />
            <Input type='password' placeholder="비밀번호를 입력해주세요." onChange={(e) => setPassword(e.target.value)} />
            {loginCheck && (<label style={{color:"red"}}> 아이디 혹은 비밀번호가 틀렸습니다.</label> )}
          </InputLine>
          <EtcLine>
            <LeftBox>
              <CheckSecurity type="checkbox" />
              보안접속
            </LeftBox>
            <RightBox>
              <Find to="/findid">아이디 찾기</Find>
              <Find to="/findpassword">비밀번호 찾기</Find>
            </RightBox>
          </EtcLine>
          <ButtonLine>
            <Button type="button" onClick={handleLogin}>로그인</Button>
            <Button type="button" onClick={() => navigate('/registration')}>회원가입</Button>
          </ButtonLine>
        </form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;
const Wrapper = styled.div`
  background: #e9e9e9;
  width: 40vw;
  height: 55vh;
  border: 1px solid black;
`;
const Title = styled.div`
  padding-top: 20px;
  font-size: 40px;
  font-weight: bold;
`;
const InputLine = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 300px;
  height: 60px;
  margin-top: 10px;
  font-size: 20px;
  padding-left: 10px;
`;

const EtcLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 20px auto 20px;
  font-size: 14px;
  color: #333;
`;

const CheckSecurity = styled.input``;

const LeftBox = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
`;

const RightBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Find = styled(Link)`
  text-decoration: none;
  color: #333;

  &:hover {
    color: #333;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const ButtonLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: white;
  width: 300px;
  height: 60px;
  margin-top: 10px;
  font-size: 20px;
  padding-left: 10px;
  border: 1px solid black;
  border-radius: 0;
  color: #5f0680;

  &:hover {
    opacity: 0.9;
    background: #5f0680;
    color: white;
  }
`;