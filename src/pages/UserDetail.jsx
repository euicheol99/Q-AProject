import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoPersonCircle } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import axios from 'axios';
import useUserStore from '../store/UserStore';
import { useParams } from 'react-router-dom';

const schema = yup.object({
  password: yup.string().min(7, '비밀번호는 최소 7자 이상이어야 합니다.').required('비밀번호를 입력하세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
  name: yup.string().required('이름을 입력하세요.'),
  email: yup.string().email('올바른 이메일 형식이 아닙니다.').required('이메일을 입력하세요.'),
});


const UserDetail = () => {
  const {setUser} = useUserStore();
  const navigate = useNavigate();
  const memberStr = sessionStorage.getItem('loginUser');
  const member = memberStr ? JSON.parse(memberStr) : null;
  const id = member.member_id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!memberStr) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      setValue('member_id', member.member_id);
      setValue('password', member.password);
      setValue('confirmPassword', member.password);
      setValue('name', member.name);
      setValue('email', member.email);
    }
  }, [navigate, setValue, member, memberStr]);

  const onSubmit = async (data) => {
  try {
    // confirmPassword 제거
    const { confirmPassword, ...userData } = data;

    await axios.put(`http://localhost:8889/api/members/${id}`, userData);

    const response = await axios.get(`http://localhost:8889/api/members/${id}`);
    const updateUser = response.data;

    sessionStorage.setItem('loginUser', JSON.stringify(updateUser));
    setUser(updateUser);

    alert('정보가 수정되었습니다.');
    navigate('/');
  } catch (error) {
    console.error('수정 실패:', error);
    alert('수정에 실패했습니다.');
  }
};
  

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Title>내정보</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <IoPersonCircle size={25} />
            <Input type="text" {...register('member_id')} readOnly />
          </FormRow>
          <FormRow>
            <RiLockPasswordFill size={25} />
            <Input type="password" {...register('password')} />
          </FormRow>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          <FormRow>
            <RiLockPasswordFill size={25} />
            <Input type="password" {...register('confirmPassword')} />
          </FormRow>
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          <FormRow>
            <FaUser size={25} />
            <Input type="text" {...register('name')} />
          </FormRow>
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          <FormRow>
            <IoMdMail size={25} />
            <Input type="text"  {...register('email')} />
          </FormRow>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          <SubmitLine>
            <Button type="submit">수정하기</Button>
            <Button type="button" onClick={goHome} style={{ marginRight: '0px' }}>
              취소하기
            </Button>
          </SubmitLine>
        </form>
      </Wrapper>
    </Container>
  );
};

export default UserDetail;

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

