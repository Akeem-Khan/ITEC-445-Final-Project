const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { addMessage, getChannelMessages } = require("./controllers/message.controller");
const { channels, addUserToChannel } = require("./controllers/channel.controller");

import noticeRoutes from './routes/notice.route';
import userRoutes from './routes/user.route';

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

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

app.use('/notices', noticeRoutes);
app.use('/auth', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});