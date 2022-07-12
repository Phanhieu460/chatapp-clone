import styled from 'styled-components'
import Head from "next/head"
import Sidebar from '../../components/Sidebar'
import { GetServerSideProps } from 'next'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { Conversation, IMessage } from '../../types'
import { getRecipientEmail } from '../../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { generateQueryMessage, transformMessage } from '../../utils/getMessagesInConversation'
import ConversationScreen from '../../components/ConversationScreen'


interface Props {
  conversation: Conversation,
  messages: IMessage[]
}
const Conversation = ({conversation, messages}: Props) => {
  const [loggedInUser] = useAuthState(auth)
  
  return (
    <StyledContainer>
        <Head>
            <title>Conversation with {getRecipientEmail(conversation.users, loggedInUser)}</title>
        </Head>
        <Sidebar/>
        <StyledConversaionContainer>
          <ConversationScreen conversation={conversation} messages={messages}/>
        </StyledConversaionContainer>
    </StyledContainer>
  )
}

export default Conversation

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;
  //get conversation to know who we are chatting with
  const conversationRef = doc(db, "conversations", conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  //get all message between logged in user and recipient in this conversation
  const queryMessage = generateQueryMessage(conversationId)

  const messageSnapshot =await getDocs(queryMessage)

  const messages = messageSnapshot.docs.map(messageDoc => transformMessage(messageDoc))
  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages
    },
  };
};

const StyledContainer = styled.div`
    display:flex;
`

const StyledConversaionContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;