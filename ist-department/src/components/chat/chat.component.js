import {
    ConversationHeader,
    Avatar,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
    MessageSeparator,
    Conversation,
    ConversationList
} from '@chatscope/chat-ui-kit-react';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import {
    Grid, Paper, Button, Dialog, DialogTitle, List,
    ListItem, ListItemAvatar, ListItemText
} from '@mui/material'; // Grid version 1
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from "../../context/auth.context";
import UsersContext from '../../context/users.context';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const server = 'http://localhost:4000/'


function NewChatDialog(props) {
    const { onClose, selectedValue, open, users } = props;
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {users.map((user) => (
                    <ListItem button onClick={() => handleListItemClick(user)} key={user.email}>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}


NewChatDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
};

function Chat() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const { user } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const { users } = useContext(UsersContext);

    const [selectedChat, setSelectedChat] = useState(null);



    const getOtherUsers = (chats) => {
        let results = []
        for (let i = 0; i < chats.length; i++) {
            let chat = chats[i];
            let otherUserId = ''
            chat.users.forEach(uid => {
                if (uid != user.id) {
                    otherUserId = uid
                }
            })
            chat.otherUser = getUser(otherUserId)
            results.push(chat)
        }

        return results
    }



    const getUser = (id) => {
        return users.find((userData) => {
            console.log(userData._id, id)
            return userData._id == id
        })
    }

    const selectChat = (chat) => {
        setSelectedChat(chat)
    }
    const handleClickOpen = () => {
        console.log('open')
        setOpen(true);
    };

    useEffect(() => {
        const usersRes = axios.get(server + 'auth/all').then(usersRes=>{
            console.log(usersRes)
        })
        

        axios.get('http://localhost:4000/chat/all/user/' + user.id)
            .then(response => {
                let chats = getOtherUsers(response.data)
                setChats(chats);
                console.log(chats)
            })
            .catch(function (error) {
                console.log(error);
            })




    }, []);


    const handleClose = async (value) => {
        setOpen(false);
        console.log(value, user)
        let newChat = { users: [user.id, value._id] }
        await axios.post('http://localhost:4000/chat/add', newChat);
        // setSelectedValue(value);
    };

    return (

        <div className='container-fluid' >
            <div className="row">
                <div className="col-4" >
                    <Paper elevation={3} style={{ height: '70vh' }}>
                        <div>
                            <Button variant="contained" onClick={handleClickOpen}>New Chat</Button>

                        </div>
                        <ConversationList>

                            {
                                chats && chats.map(chat => {
                                    return (

                                        <Conversation name={chat.otherUser.name} key={chat._id}>
                                        </Conversation>
                                    )
                                })
                            }
                            <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                                <Avatar name="Lilly" />
                            </Conversation>



                        </ConversationList>
                    </Paper>

                </div>

                <div className="col-8" >


                    <Paper elevation={3} style={{ height: '70vh' }}>
                        {
                            selectedChat && (

                                <ChatContainer>
                                    <ConversationHeader>
                                        <Avatar name="Emily" />
                                        <ConversationHeader.Content userName="Emily" info="Active 10 mins ago" />
                                    </ConversationHeader>
                                    <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}>
                                        <MessageSeparator content="Saturday, 30 November 2019" />

                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "single"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: 'Me',
                                            direction: "outgoing",
                                            position: "single"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "first"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "last"
                                        }} />

                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>

                                        <MessageSeparator content="Saturday, 31 November 2019" />

                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "single"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: 'Me',
                                            direction: "outgoing",
                                            position: "single"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "first"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            direction: "outgoing",
                                            position: "last"
                                        }} />

                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Emily",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                            <Avatar name={"Emily"} />
                                        </Message>

                                    </MessageList>
                                    <MessageInput placeholder="Type message here" />
                                </ChatContainer>
                            )

                        }

                    </Paper>
                </div>
            </div>
            <NewChatDialog
                selectedValue={selectedValue}
                open={open}
                users={users}
                onClose={handleClose}
            />

            <Toolbar></Toolbar>
        </div>

    );
}





export default Chat;