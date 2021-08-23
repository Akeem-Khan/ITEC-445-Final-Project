import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../../context/auth.context";


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


function NoticeList() {
    const { user } = useContext(AuthContext);
    const [notices, setNotices] = useState([]);
    const forceUpdate = useForceUpdate();


    useEffect(() => {
        axios.get('http://localhost:4000/notices/')
            .then(response => {
                setNotices(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);


    function flag(notice){
        notice.flagged.is_flagged = true;
        notice.flagged.info = `This post was removed by ${user.name}. You can contact this person with the following: ${user.email}`;
        notice.flagged.by = user.email;

        axios.post('http://localhost:4000/notices/update/'+notice._id, notice)
            .then(res => console.log(res.data));

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
        <div>
            <h3>Notices</h3>
            {
                notices && notices.map(notice => {
                    return (
                        <>
                            <div style={{backgroundColor: "#ccc", borderRadius: "5px", padding: "5px"}}>
                                <h4>{notice.title}</h4>

                                {notice.flagged.is_flagged && (
                                    <p>{notice.flagged.info}</p>
                                )}

                                {!notice.flagged.is_flagged && (
                                    <p>{notice.text}</p>
                                )}
                                
                                Author: {notice.author} &nbsp; Catrgory: {notice.category}
                                <br/>

                                {user !== undefined && (
                                    <>
                                        <br/>
                                        {user.email === notice.author && (user.role === 'student_leader' || user.role === 'faculty') && (
                                            <Link to={"/edit/"+notice._id}><button className="btn btn-primary">Edit</button></Link>
                                        )}

                                        {user.role === 'faculty' && user.email !== notice.author && (
                                            <>
                                                {notice.flagged.is_flagged && (
                                                    <button onClick={() => unFlag(notice)} className="btn btn-danger">Remove Flag</button>
                                                )}

                                                {!notice.flagged.is_flagged && (
                                                    <button onClick={() => flag(notice)} className="btn btn-danger">Flag</button>
                                                )}
                                                
                                            </>
                                            
                                        )}
                                    </>
                                )}      
                            </div>
                            <br/>
                        </>
                    )
                })
            }
        </div>
    )
}

export default NoticeList;