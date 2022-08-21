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
import PersonIcon from '@mui/icons-material/Person';
import {
    Grid,
    Paper, 
    Button, 
    Dialog, 
    DialogTitle, 
    List,
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Toolbar, 
    Box
} from '@mui/material'; // Grid version 1
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from "../../context/auth.context";
import UsersContext from '../../context/users.context';
import SocketContext from '../../context/socket.context';
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
            <DialogTitle>New Chat</DialogTitle>
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
    const { user } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const { users } = useContext(UsersContext);
    const { socket } = useContext(SocketContext);
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    socket.on('message', record => {
        axios.get('http://localhost:4000/chat/all/user/' + user.id)
            .then(response => {
                let chats = getOtherUsers(response.data)
                setChats(chats);
                if (selectedChat) {
                    chats.forEach(chat => {
                        if (chat._id === selectedChat._id) {
                            setSelectedChat(chat)
                        }
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            })


    });


    const getOtherUsers = (chatList) => {
        let results = []
        for (let i = 0; i < chatList.length; i++) {
            let chat = chatList[i];
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
            return userData._id == id
        })
    }

    const handleSendMessage = (text) => {
        console.log(text)
        socket.emit('send-message', { selectedChat, text, sender: user.id, date: Date.now() });
    }

    const selectChat = (chat) => {
        setSelectedChat(chat)
    }
    const handleClickOpen = () => {
        console.log('open')
        setOpen(true);
    };

    const getChats = () => {
        axios.get('http://localhost:4000/chat/all/user/' + user.id)
            .then(response => {
                let chats = getOtherUsers(response.data)
                setChats(chats);
                console.log(chats)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        const usersRes = axios.get(server + 'auth/all').then(usersRes => {
        })


        getChats()
    }, []);


    const handleClose = async (value) => {
        setOpen(false);
        try {
            let newChat = { users: [user.id, value._id] }
            // await axios.post('http://localhost:4000/chat/add', newChat);
            socket.emit('new-chat', newChat);
            getChats()
        } catch {

        }

        // setSelectedValue(value);
    };

    return (
        <div className='container-fluid' >
            <div className="row">
                <div className="col-4" >
                    <Paper elevation={3} style={{ height: '70vh' }}>
                        <Toolbar>
                            <Button variant="contained" onClick={handleClickOpen}>New Chat</Button>

                        </Toolbar>

                        <ConversationList>

                            {
                                chats && chats.map(chat => {
                                    return (

                                        <Conversation name={chat.otherUser.name} key={chat._id} onClick={() => selectChat(chat)}>
                                        </Conversation>
                                    )
                                })
                            }
                        </ConversationList>
                    </Paper>
                </div>

                <div className="col-8" >


                    <Paper elevation={3} style={{ height: '70vh' }}>
                        {
                            selectedChat && (

                                <ChatContainer>
                                    <ConversationHeader>
                                        <ConversationHeader.Content userName={selectedChat.otherUser.name} />
                                    </ConversationHeader>
                                    <MessageList >
                                        {
                                            selectedChat.messages && selectedChat.messages.map(message => {
                                                return (

                                                    <Message model={{
                                                        message: message.text,
                                                        direction: message.sender == user.id ? 'outgoing' : 'incoming',
                                                    }} key={message.date} />
                                                )
                                            })
                                        }





                                    </MessageList>
                                    <MessageInput placeholder="Type message here" onSend={handleSendMessage} attachButton={false} />
                                </ChatContainer>
                            )

                        }

                        {
                            !selectedChat && (

                                <Box sx={{p: 3}}>
                                    Select A Chat
                                </Box>
                            )

                        }

                    </Paper>
                </div>
            </div>
            <NewChatDialog
                open={open}
                users={users.filter((listUser) => {
                    return listUser._id != user.id
                })}
                onClose={handleClose}
            />

            <Toolbar></Toolbar>
        </div>

    );
}





export default Chat;