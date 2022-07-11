import  LogoutIcon  from '@mui/icons-material/Logout'
import  ChatIcon  from '@mui/icons-material/Chat'
import  SearchIcon  from '@mui/icons-material/Search'
import  MoreVerticalIcon  from '@mui/icons-material/MoreVert'

import { Avatar, Button, IconButton } from '@mui/material'
import  Tooltip  from '@mui/material/Tooltip'
import React from 'react'
import styled from 'styled-components'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'


const Sidebar = () => {
    const logOut = async () => {
        try {
            await signOut(auth)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="User Email" placement="right">
          <StyledUserAvatar />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton onClick={logOut}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch>
        <SearchIcon />
        <StyledSearchInput placeholder="Search" />
      </StyledSearch>
      <StyledSidebarButton>Start A New Conversation</StyledSidebarButton>
    </StyledContainer>
  );
}

export default Sidebar

const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;
`
const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top:0;
    background-color: white;
    z-index: 1;
`
const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`
const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`
const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`

const StyledSearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`