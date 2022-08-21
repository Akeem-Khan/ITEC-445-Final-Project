import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import socketClient from "socket.io-client";

const SERVER = 'http://localhost:4000/'

const SocketContext = createContext();

function SocketContextProvider(props) {
    const [socket, setSocket] = useState([]);

    async function getSocket() {
        var socket = socketClient(SERVER);
        socket.on('connection', () => {
            console.log(`I'm connected with the back-end`);
        });
        setSocket(socket);
    }



    useEffect(() => {
        getSocket();
    }, []);

    return (
        <SocketContext.Provider value={{ socket, getSocket }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketContext;
export { SocketContextProvider };
