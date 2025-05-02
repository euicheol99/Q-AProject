import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor}; // 테마에서 설정한 배경색 사용
  color: ${({ theme }) => theme.textColor};         // 텍스트 색상도 테마로
  min-height: calc(100vh - 70px);
  padding: 20px;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>홈페이지</h1>
      <p>여기는 테마 적용됨</p>
    </Container>
  )
};

export default HomePage;
