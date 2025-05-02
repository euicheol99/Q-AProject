import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    background-color: ${({ theme }) => theme.bgColor}; 
    color: ${({ theme }) => theme.textColor}; 
`
const Wrapper = styled.div`
    background: #e9e9e9;
    width: 40vw;
    height: 55vh;
    border: 1px solid black;

`
const Title = styled.div`
    padding-top: 20px;
    font-size: 40px;
    font-weight: bold;
`
const InputLine = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Input = styled.input`
    width: 300px;
    height: 60px;
    margin-top: 10px;
    font-size: 20px;
    padding-left: 10px;
`

const EtcLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 20px auto 20px;
  font-size: 14px;
  color: #333;
`;

const CheckSecurity = styled.input`

`

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
`

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

    &:hover{
        opacity: 0.9;
        background: #5f0680;
        color: white;
    }
`


const LoginPage = () => {
  return (
    <Container>
        <Wrapper>
            <Title>로그인</Title>
            <InputLine>
                <Input placeholder='아이디를 입력해주세요.'/>
                <Input placeholder='비밀번호를 입력해주세요.'/>
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
                <Button >로그인</Button>
                <Button >회원가입</Button>
            </ButtonLine>
        </Wrapper>
    </Container>
  )
}

export default LoginPage