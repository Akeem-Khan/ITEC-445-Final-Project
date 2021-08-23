import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import AuthContext from "../../context/auth.context";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function UserList() {
    const { user } = useContext(AuthContext);
    const [students, setStudents] = useState([]);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        axios.get('http://localhost:4000/auth/confirm')
            .then(res => {
                setStudents(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    function approve(id){
        const role = {
            role: 'student_leader'
        };

        axios.post('http://localhost:4000/auth/update/'+id, role)
            .catch(err => {
                console.log(err);
                return;
            });

        
        let stu = students;
        let index = stu.findIndex(s => s._id === id);
        stu[index].role = role.role;

        setStudents(stu);
        forceUpdate();
    }

    function revoke(id){
        const role = {
            role: 'pending'
        };

        axios.post('http://localhost:4000/auth/update/'+id, role)
            .catch(err => {
                console.log(err);
                return;
            });

        
        let stu = students;
        let index = stu.findIndex(s => s._id === id);
        stu[index].role = role.role;

        setStudents(stu);
        forceUpdate();
    }
    
    return (
        <div>
            <h3>Confirm Student Leaders</h3>
            {
                students && students.map(student => {
                    return (
                        <>
                            {student.role === 'pending' && (
                                <>
                                    <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px", display: "flex", justifyContent: "space-between"}}>
                                        Name: {student.name} &nbsp;&nbsp; E-mail: {student.email} &nbsp;&nbsp; Role: {student.role} <span><button className="btn btn-primary" onClick={() => approve(student._id)}>Approve</button></span>
                                    </div>
                                    <br/>
                                </>
                            )}

                            {student.role === 'student_leader' && (
                                <>
                                    <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px", display: "flex", justifyContent: "space-between"}}>
                                        Name: {student.name} &nbsp;&nbsp; E-mail: {student.email} &nbsp;&nbsp; Role: {student.role} <span><button className="btn btn-danger" onClick={() => revoke(student._id)}>Revoke</button></span>
                                    </div>
                                    <br/>
                                </>
                            )}
                        </>
                    )
                })
            }
        </div>
    )
}

export default UserList;