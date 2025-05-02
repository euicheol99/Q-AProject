import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { FaComputer } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Container = styled.div`

  background-color: ${({ theme }) => theme.bgColor}; 
  color: ${({ theme }) => theme.textColor};         
  
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5vh auto 0;
  width: 40vw;
  max-width: 1000px;
  border: 1px solid black;
  border-radius: 2px;
  background: #e9e9e9;
  border-radius: 5px;
  padding: 30px;
`;

const Title = styled.div`
  
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const Label = styled.label`
  width: 130px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  margin-left: 10px;
  padding: 8px;
  border: 1px solid black;
  width: 200px;
  height: 50px;
  font-size: 15px;
`;

const Warning = styled.div`
  margin-left: 50px;
  color: red;
  font-size: 16px;
`;

const IdButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  border: 1px solid black;
  border-radius: 0;
`

const SubmitLine = styled.div`
  margin-top: 30px;
  gap: 20px;
`

const Button = styled.button`
  margin-right: 10px;
  width: 80px;
  border: 0.5px solid black;
  border-radius: 0;
`

const Registration = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [showIdWarning, setShowIdWarning] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [showPasswordWarning2, setShowPasswordWarning2] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);

  const idCheck = (e) => {
    const value = e.target.value;
    setId(value);
    setShowIdWarning(value.length < 5);
  };

  const passwordCheck = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isValidPassword =
      value.length >= 8 &&
      /[0-9]/.test(value) &&
      /[a-zA-Z]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setShowPasswordWarning(!isValidPassword);
  };

  const passwordCheck2 = (e) => {
    const value = e.target.value;
    setPassword2(value);

    if(password !== value){
      setShowPasswordWarning2(true);
    } else {
      setShowPasswordWarning2(false);
    }
  };

  const emailCheck = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    setShowEmailWarning(!isValidEmail(value));
  }

  const navigator = useNavigate();

  const goHome = () => {
    navigator('/');
  }

  return (
    <Container>
      <Wrapper>
        <Title>회원가입</Title>
        {showIdWarning && <Warning >*아이디는 최소 5자 이상이어야 합니다.</Warning>}
        <FormRow>
          <IoPersonCircle size={25}/>
          <Input value={id} onChange={idCheck} placeholder='아이디(최소 5자~20자)'/>
          
        </FormRow>

        {showPasswordWarning && <Warning style={{marginLeft:'135px'}}>*8자 이상 숫자와 문자, 특수문자를 포함해야 합니다.</Warning>}
        <FormRow>
          <RiLockPasswordFill size={25} />
          <Input type="password" value={password} onChange={passwordCheck} placeholder='비밀번호' />
        </FormRow>

        {showPasswordWarning2 && <Warning style={{marginLeft: '0px'}}>*비밀번호가 일치하지 않습니다.</Warning>}
        <FormRow>
          <RiLockPasswordFill size={25} />
          <Input type="password" value={password2} onChange={passwordCheck2} placeholder='비밀번호 확인'/>
        </FormRow>

        <FormRow>
          <FaUser size={25}/>
          <Input placeholder='이름' />
        </FormRow>
        
        {showEmailWarning && <Warning style={{marginLeft: '0px'}}>*이메일 주소를 확인하세요.</Warning>}
        <FormRow>
          <IoMdMail  size={25}/>
          <Input placeholder='이메일' onChange={emailCheck}/>
        </FormRow>

        
        <SubmitLine >
          <Button >제출</Button>
          <Button onClick={goHome}>취소</Button>
        </SubmitLine>
        
      </Wrapper>
    </Container>
  );
};

export default Registration;
