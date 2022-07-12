import  LogoutIcon  from '@mui/icons-material/Logout'
import  ChatIcon  from '@mui/icons-material/Chat'
import  SearchIcon  from '@mui/icons-material/Search'
import  MoreVerticalIcon  from '@mui/icons-material/MoreVert'

import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import  Tooltip  from '@mui/material/Tooltip'
import React, { useState } from 'react'
import styled from 'styled-components'
import { EmailAuthProvider, signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from "email-validator"
import { addDoc, collection, query, where } from 'firebase/firestore'
import {useCollection} from "react-firebase-hooks/firestore"
import { Conversation } from '../types'
import ConversationSelect from './ConversationSelect'


const Sidebar = () => {
    const [loggedInUser] = useAuthState(auth)
    const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)
    const [recipienEmail, setRecipienEmail] = useState('')
    const toggleNewConversationDialog = (isOpen: boolean) => {
        setIsOpenNewConversationDialog(isOpen)
        if(!isOpen) setRecipienEmail('')

    }

    const queryGetConversationForCurrentUser = query(collection(db, 'conversations'), where('users', 'array-contains', loggedInUser?.email))
    const [conversationSnapshot] = useCollection(queryGetConversationForCurrentUser)
    const isConversationAlreadyExists = (recipienEmail: string) => {
        return conversationSnapshot?.docs.find(conversation=> (conversation.data() as Conversation).users.includes(recipienEmail))
    }

    const isInvitingSeft = recipienEmail === loggedInUser?.email;

    const createConversation = async () => {
      if (!recipienEmail) return;
      if (EmailValidator.validate(recipienEmail) && !isInvitingSeft && !isConversationAlreadyExists(recipienEmail)) {
        console.log('test')
        await addDoc(collection(db, "conversations"), {
          users: [loggedInUser?.email, recipienEmail],
        });
      }
      toggleNewConversationDialog(false);
    };
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
        <Tooltip title={loggedInUser?.email as string} placement="right">
          <StyledUserAvatar  src={loggedInUser?.photoURL || ''}/>
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
      <StyledSidebarButton onClick={() => toggleNewConversationDialog(true)}>Start A New Conversation</StyledSidebarButton>

    {/* List of Conversation */}
    {conversationSnapshot?.docs.map(conversation => {
        return <ConversationSelect key={conversation.id} id={conversation.id} conversationUsers={(conversation.data() as Conversation).users}/>
    })}


      <Dialog open={isOpenNewConversationDialog} onClose={() => toggleNewConversationDialog(false)}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat with
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipienEmail}
            onChange={e => setRecipienEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleNewConversationDialog(false)}>Cancel</Button>
          <Button disabled={!recipienEmail} onClick={() => createConversation()}>Create</Button>
        </DialogActions>
      </Dialog>
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
    ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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

