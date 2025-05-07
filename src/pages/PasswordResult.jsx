import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';


const PasswordResult = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  useEffect(() => {
    const getPassword = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;
        
        const user = users.find(user => String(user.userId) === String(userId));

        if (!user) {
          alert('해당 유저를 찾을 수 없습니다.');
          navigate(-1); 
          return;
        }

        const password = user.password;
        if (!password) {
          alert('비밀번호를 찾을 수 없습니다.');
          navigate(-1);
        } else {
          setPassword(password);
        }
      } catch (err) {
        console.error('데이터를 불러오는데 실패했습니다.', err);
      }
    };

    if (userId) {
      getPassword();
    }
  }, [userId, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>비밀번호 찾기</Title>
        <InputLine>
          <SecondLine>
            <div>비밀번호는</div>
            <Result>{password}</Result>
            <div>입니다.</div>
          </SecondLine>
          <Button onClick={() => navigate('/login')}>로그인하기</Button>
        </InputLine>
      </Wrapper>
    </Container>
  );
};

export default PasswordResult;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;

const Wrapper = styled.div`
  background: #e9e9e9;
  width: 40vw;
  height: 35vh;
  border: 1px solid black;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 40px;
  font-weight: bold;
`;

const InputLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;

const Button = styled.button`
  background: white;
  width: 300px;
  height: 60px;
  margin-top: 10px;
  margin-left: 50px;
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

const Result = styled.div`
  font-weight: bold;
`;
