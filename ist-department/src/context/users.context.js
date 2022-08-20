import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const server = 'http://localhost:4000/'

const UsersContext = createContext();

function UsersContextProvider(props) {
    const [users, setUsers] = useState([]);
    
    async function getUsers() {
        const usersRes = await axios.get(server + 'auth/all')
        console.log(usersRes)
        setUsers(usersRes.data);
    }



    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, getUsers }}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UsersContext;
export { UsersContextProvider };
