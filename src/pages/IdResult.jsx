import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';

const IdResult = () => {
  const {name} = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try{
        const response = await axios.get('http://localhost:3001/users');
        const users = response.data;

        const user = users.find(user => String(user.name) === String(name));

        if(!user) {
          alert('해당 유저를 찾을 수 없습니다.');
          navigate(-1);
          return;
        }

        const userId = user.userId;
        if(!userId){
            alert('아이디를 찾을 수 없습니다.');
            navigate(-1);
        } else {
            setUserId(userId);
        }
      } catch (err) {
        console.error('데이터를 불러오는데 실패했습니다.', err);
      }
    };

    if (name) {
        getUserId();
    }
  }, [name,navigate])
 
  return (
    <Container>
      <Wrapper>
        <Title>아이디 찾기</Title>
        <InputLine>
          <SecondLine>
            <div>아이디는</div>
            <Result>{userId}</Result>
            <div>입니다.</div>
          </SecondLine>
          <Button onClick={() => navigate('/login')}>로그인하기</Button>
        </InputLine>
      </Wrapper>
    </Container>
  )
}

export default IdResult

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
