import React from 'react';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

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

const Input = styled.input`
  width: 300px;
  height: 65px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 30px;
  margin-top: 10px;
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const FindIdPage = () => {
  const navigator = useNavigate();

  const handlePasswordFind = () => {
    navigator('/findpassword');
  };
  return (
    <Container>
      <Wrapper>
        <Title>아이디 찾기</Title>
        <InputLine>
          <SecondLine>
            <FaUserAlt style={{ marginRight: '10px' }} size={40} />
            <Input placeholder="이름을 입력하세요." />
          </SecondLine>
          <SecondLine>
            <IoMdMail style={{ marginRight: '10px' }} size={40} />
            <Input placeholder="이메일을 입력하세요." />
          </SecondLine>
          <Button>아이디 찾기</Button>
          <Button onClick={handlePasswordFind}>비밀번호 찾기</Button>
        </InputLine>
      </Wrapper>
    </Container>
  );
};

export default FindIdPage;
