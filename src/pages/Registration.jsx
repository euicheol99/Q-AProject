import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IoMdMail } from 'react-icons/io';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  member_id: yup.string().min(5, '아이디는 5자 이상이어야 합니다.').required('아이디를 입력하세요.'),
  name: yup.string().required('이름은 필수입니다.'),
  password: yup
    .string()
    .min(7, '비밀번호는 7자 이상이어야 합니다.')
    .max(15, '비밀번호는 15자 이하여야 합니다.')
    .required('비밀번호를 입력하세요.'),
  Password: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력하세요.'),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const checkDuplicateId = async () => {
    const id = getValues('member_id');
  
    if (!id || id.length < 5) {
      setError('member_id', { message: '5자 이상 입력 후 중복확인을 눌러주세요.' });
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8889/api/members/${id}`);
      const data = await res.json();
  
      const isDuplicate = data.length > 0;
  
      if (isDuplicate) {
        setError('member_id', { message: '이미 사용 중인 아이디입니다.' });
      } else {
        clearErrors('member_id');
        alert('사용 가능한 아이디입니다!');
      }
    } catch (err) {
      setError('member_id', { message: '서버 요청 실패' });
    }
  };
  

  const onSubmit = async (data) => {
  const { confirmPassword, ...submitData } = data; 

  const res = await fetch('http://localhost:8889/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitData),
  });

  if (res.ok) {
    alert('회원가입 완료!');
    navigator('/');
  } else {
    alert('회원가입 실패');
  }
};

  const navigator = useNavigate();

  const goHome = () => {
    navigator('/');
  };

  return (
    <Container>
      <Wrapper>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <IoPersonCircle size={25} />
            <Input type="text" placeholder="아이디(최소 5자~20자)" {...register('member_id')} />
            <DuplicateIdButton onClick={checkDuplicateId}>중복체크</DuplicateIdButton>
          </FormRow>
          {errors.member_id && <ErrorText>{errors.member_id.message}</ErrorText>}
          <FormRow>
            <RiLockPasswordFill size={25} />
            <Input type="password" placeholder="비밀번호" {...register('password')} />
          </FormRow>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          <FormRow>
            <RiLockPasswordFill size={25} />
            <Input type="password" placeholder="비밀번호 확인" {...register('Password')} />
          </FormRow>
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          <FormRow>
            <FaUser size={25} />
            <Input type="text" placeholder="이름" {...register('name')} />
          </FormRow>
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          <FormRow>
            <IoMdMail size={25} />
            <Input type="text" placeholder="이메일" {...register('email')} />
          </FormRow>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <SubmitLine>
            <Button type="submit">가입하기</Button>
            <Button onClick={goHome} style={{ marginRight: '0px' }}>
              취소하기
            </Button>
          </SubmitLine>
        </form>
      </Wrapper>
    </Container>
  );
};

export default Registration;

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



const Input = styled.input`
  flex: 1;
  margin-left: 10px;
  padding: 8px;
  border: 1px solid black;
  width: 200px;
  height: 50px;
  font-size: 15px;
`;

const SubmitLine = styled.div`
  margin-top: 30px;
  gap: 20px;
`;

const Button = styled.button`
  margin-right: 10px;
  width: 100px;
  border: 0.5px solid black;
  border-radius: 0;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 6px;
`;

const DuplicateIdButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 0px;
  border-right: 0.5px solid black;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
`;
