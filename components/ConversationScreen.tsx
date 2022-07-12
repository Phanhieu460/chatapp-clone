import React from 'react'
import styled from 'styled-components'
import { useRecipient } from '../hooks/useRecipient'
import { Conversation, IMessage } from '../types'
import { convertFirestoreTimestampToString, generateQueryMessage, transformMessage } from '../utils/getMessagesInConversation'
import RecipientAvatar from './RecipientAvatar'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'

const ConversationScreen = ({conversation, messages}: {conversation: Conversation, messages: IMessage[]}) => {
    const conversationUsers = conversation.users

    const {recipientEmail, recipient} = useRecipient(conversationUsers)

    const router = useRouter()
    const conversationId = router.query.id //localhost:3000/conversations/:id

    const queryGetMessage = generateQueryMessage(conversationId as string)

    const [messagesSnapshot, messagesLoading] = useCollection(queryGetMessage)
    const showMessages = () =>{
        if(messagesLoading) {
          return messages.map((message, index) => <Message key={message.id} message={message} />)
        }
        if (messagesSnapshot) {
          return messagesSnapshot.docs.map((message, index) => <Message key={message.id} message={transformMessage(message)} />)
        }
        return null
    }
    return (
        <>
      <StyledRecipientHeader>
        <RecipientAvatar
          recipient={recipient}
          recipientEmail={recipientEmail}
        />
        <StyledHeaderInfo>
          <StyledH3>{recipientEmail}</StyledH3>
          {recipient && (
            <span>
              Last active:{" "}
              {convertFirestoreTimestampToString(recipient.lastSeen)}
            </span>
          )}
        </StyledHeaderInfo>
        <StyledHeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </StyledHeaderIcons>
      </StyledRecipientHeader>

      <StyledMessageContainer>
        {showMessages()}
      </StyledMessageContainer>
      </>
    );
}

export default ConversationScreen

const StyledRecipientHeader = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top:0;
    display: flex;
    align-items: center;
    padding: 11px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;

`

const StyledHeaderInfo = styled.div`
    margin-left: 15px;
    flex-grow:1;
    >h3 {
        margin-top: 0;
        margin-bottom: 3px;
    }
    > span {
        font-size: 14px;
        color: gray
    }
`

const StyledH3 = styled.h3`
    word-break: break-all;
`

const StyledHeaderIcons = styled.div`
	display: flex;
`
const StyledMessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`