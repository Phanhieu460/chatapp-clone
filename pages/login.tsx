import { WhatsappOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import Head from "next/head"
import Image from 'next/image'
import styled from "styled-components"
import WhatAppLogo from '../assets/whatsapplogo.png'
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const signIn = () => {
        signInWithGoogle()
    }
  return (
    <StyledContainer>
        <Head>
            <title>Login</title>
        </Head>
        <StyledLoginContainer>
            <StyledImageWrapper>

            <Image src={WhatAppLogo} alt='What App' height='200px' width='200px'/>
            </StyledImageWrapper>

            <Button variant="outlined" onClick={signIn}> Sign In With Google</Button>
        </StyledLoginContainer>
    </StyledContainer>
  )
}

export default Login

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`

const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`
const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`