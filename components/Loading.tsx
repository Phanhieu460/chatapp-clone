import styled from "styled-components"
import Image from "next/image"
import WhatAppLogo from "../assets/whatsapplogo.png"
import { CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <StyledContainer>
        <StyledImageWrapper>
            <Image src={WhatAppLogo} alt='What App Logo' height='200px' width='200px'/>
        </StyledImageWrapper>
        <CircularProgress/>
    </StyledContainer>
  )
}

export default Loading

const StyledContainer= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;
    
`

const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`