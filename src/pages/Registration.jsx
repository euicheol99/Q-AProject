import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 40vw;
    height: 75vh;
    max-width: 1000px;
    background: #c8fac8;
`
const Title = styled.h1`
    color: blue;
`
const Registration = () => {
  return (
    <Container>
        <Title>회원가입</Title>
    </Container>
  )
}

export default Registration