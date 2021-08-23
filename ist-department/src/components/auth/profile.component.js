import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from "../../context/auth.context";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function Profile() {
    const { user, getUser } = useContext(AuthContext);
    const [notices, setNotices] = useState([]);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        axios.get('http://localhost:4000/notices/')
            .then(response => {
                setNotices(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function apply(){
        const role = {
            role: 'pending'
        };

        axios.post('http://localhost:4000/auth/update/'+user.id, role)
            .then(res => {
                getUser();
            })
            .catch(err => {
                console.log(err);
            });

        forceUpdate();
    }

    function revert(){
        const role = {
            role: 'student'
        };

        axios.post('http://localhost:4000/auth/update/'+user.id, role)
            .then(res => {
                getUser();
            })
            .catch(err => {
                console.log(err);
            });

        forceUpdate();
    }

    function unFlag(notice){
        notice.flagged.is_flagged = false;
        notice.flagged.info = '';
        notice.flagged.by = '';

        axios.post('http://localhost:4000/notices/update/'+notice._id, notice)
            .then(res => console.log(res.data));

        forceUpdate();
    }
    
    return (
        <>
            <h3>User Info</h3>
            <br/>
            <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px"}}>
                <h4>{user.name}</h4>
                <p>
                    E-mail: {user.email}
                    <br/>
                    Role: {user.role}
                </p>

                {user !== undefined && (
                    <>
                        {user.role === 'student' && (
                            <>
                                Want to apply for Student Leader?
                                <br/>
                                <br/>
                                <button className="btn btn-primary" onClick={apply}>Apply Now</button>
                            </>
                        )}

                        {((user.role === 'pending') || (user.role === 'student_leader')) && (
                            <>
                                Do you want to revert your role back to student?
                                <br/>
                                <br/>
                                <button className="btn btn-danger" onClick={revert}>Revert</button>
                            </>
                        )}
                    </>
                    
                )}
            </div>

            <br/>
            <h3>Your Notices</h3>
            <br/>

            {
                notices && notices.map(notice => {
                    return (
                        <div>
                            {user !== undefined && (
                                user.email === notice.author && (
                                    <>
                                        <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px"}}>
                                            <h4>{notice.title}</h4>
                                            <p>{notice.text}</p>
                                            Catrgory: {notice.category}
                                            
                                            <br/>
                                            <br/>
                                            {user.role === 'student_leader' || user.role === 'faculty' && (
                                                <Link to={"/edit/"+notice._id}><button className="btn btn-primary">Edit</button></Link>
                                            )}
                                        </div>
                                        <br/>
                                    </>
                                )
                            )}
                        </div>
                    )
                })
            }
            

            {user !== undefined && (
                <>
                    {user.role === 'faculty' && (
                        <>
                            <br/>
                            <h3>Notices Flagged By You</h3>
                            <br/>

                            {
                                notices && notices.map(notice => {
                                    return (
                                        <div>
                                            {user.email === notice.flagged.by && (
                                                <>
                                                    <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px"}}>
                                                        <h4>{notice.title}</h4>
                                                        <p>{notice.text}</p>

                                                        Author: {notice.author} &nbsp; Catrgory: {notice.category}
                                                        <br/>
                                                        <br/>
                                                        <button onClick={() => unFlag(notice)} className="btn btn-danger">Remove Flag</button>
                                                    </div>
                                                    <br/>
                                                </>
                                            )}
                                        </div>
                                    )
                                })
                            }
                        </>
                    )}
                </>
                
            )}
        </>
    );
}

export default Profile;