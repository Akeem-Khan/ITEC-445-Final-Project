const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { addMessage, getChannelMessages } = require("./controllers/message.controller");
const { channels, addUserToChannel } = require("./controllers/channel.controller");
var http = require('http').createServer(app);
var io = require('socket.io')(http);
import noticeRoutes from './routes/notice.route';
import userRoutes from './routes/user.route';
import chatRoutes from './routes/chat.route';
import chatModel from './models/chat.model';


dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: [
            process.env.CLIENT_URL,
        ],
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MDB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

app.use('/notices', noticeRoutes);
app.use('/auth', userRoutes);
app.use('/chat', chatRoutes);


var server = app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});


var io = require('socket.io')(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});



io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('send-message', chat => {
        chatModel.findById(chat.selectedChat._id, (err, record) => {
            if (record.messages == undefined) {
                record.messages = []
            }

            record.messages.push({ text: chat.text, date: chat.date, sender: chat.sender })
            record.save()
            io.emit('message', record);




        })

        // io.emit('message', chat);
    });

    socket.on('new-chat', chat => {
        let record = new chatModel(chat);
        record.save()
            .then(record => {
                io.emit('message', record);
            })
            .catch(err => {

            });
    });




});