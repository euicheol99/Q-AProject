import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  title: yup.string().required('제목을 입력하세요.'),
  content: yup.string().required('내용을 입력하세요.'),
  stack: yup.string().required('카테고리를 선택하세요.')
});

const commonFont = `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`;

const PostForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    trigger, 
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const userStr = sessionStorage.getItem('loginUser');
  const user = userStr ? JSON.parse(userStr) : null;
  const userId = user?.member_id;

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [user, navigate]);

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      const { title, content, stack } = getValues();
      if (!title) alert('제목을 입력하세요.');
      else if (!stack) alert('카테고리를 선택하세요.');
      else if (!content) alert('내용을 입력하세요.');
      return;
    }

    
    const newPost = {
      post_title: getValues('title'),
      content: getValues('content'),
      stack: getValues('stack'),
      member_id: userId,
    };

    const res = await fetch('http://localhost:8889/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      alert('작성 완료!');
      reset();
      navigate('/');
    } else {
      alert('작성 실패');
    }
  };

  // userId 없으면 폼 렌더링 막기
  if (!userId) return null;

  return (
    <Container>
      <Wrapper>
        <h2>질문작성하기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title type="text" placeholder="제목을 입력하세요." {...register('title')} />
          <SelectLine>
            작성자
            <Writer value={userId} {...register('userId')} readOnly />
            <Select {...register('stack')}>
              <option value="">카테고리</option>
              <option value="자바">자바</option>
              <option value="데이터베이스">데이터베이스</option>
              <option value="자바스크립트">자바스크립트</option>
              <option value="리액트">리액트</option>
              <option value="CSS">CSS</option>
              <option value="JSP">JSP</option>
            </Select>
          </SelectLine>
          <Content
            type="text"
            placeholder="내용을 입력하세요."
            {...register('content')}
          />
          <ButtonLine>
            <Button type="submit">작성하기</Button>
            <Button type="button" onClick={() => navigate('/')}>
              취소하기
            </Button>
          </ButtonLine>
        </form>
      </Wrapper>
    </Container>
  );
};

export default PostForm;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  border: 1px solid black;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.input`
  width: 50vw;
  height: 5vh;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

const Content = styled.textarea`
  justify-content: flex-start;
  padding-left: 10px;
  font-size: 20px;
  font-family: ${commonFont};
  width: 50vw;
  height: 50vh;
  padding-top: 10px;
  padding-left: 10px;
  resize: none;
`;

const SelectLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  width: 50vw;
  height: 5vh;
  margin-bottom: 20px;
`;

const Writer = styled.input`
  font-size: 16px;
  width: 20vw;
  height: 5vh;
  margin-right: 30px;
  margin-left: 10px;
`;

const Select = styled.select`
  font-size: 16px;
  height: 5vh;
`;

const ButtonLine = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin-right: 10px;
  width: 100px;
  border: 0.5px solid black;
  border-radius: 0;
`;
