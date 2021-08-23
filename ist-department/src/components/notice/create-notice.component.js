import React, {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from "../../context/auth.context";

function CreateNotice() {
    const { user } = useContext(AuthContext);
    
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState(user.email);

    async function submit(e) {
        e.preventDefault();

        const newNotice = {
            title,
            text,
            category,
            author,
            flagged: {
                is_flagged: false,
                info: '',
                by: ''
            }
        };

        await axios.post('http://localhost:4000/notices/add', newNotice);

        setTitle("");
        setText("");
        setCategory("");
    }
    
    return (
        <div style={{marginTop: 20}}>
            <h3>Create New Notice</h3>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Text: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Category: </label>
                    <br/>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="----------">----------</option>

                        <option value="BSc Computer Information Systems">BSc Computer Information Systems</option>
                        <option value="BSc Information and Library Science">BSc Information and Library Science</option>
                        <option value="BSc Information Technology">BSc Information Technology</option>
                        <option value="BSc Internet Technology">BSc Internet Technology</option>
                        <option value="BSc Networking">BSc Networking</option>

                        <option value="AAS Information Systems Development">AAS Information Systems Development</option>
                        <option value="AAS Information Technology">AAS Information Technology</option>
                        <option value="AAS Internet Technology">AAS Internet Technology</option>
                        <option value="AAS Library and Information Studies">AAS Library and Information Studies</option>
                        <option value="AAS Operating Systems Management">AAS Operating Systems Management</option>
                        
                        <option value="CISCO Certified Network Associate - CCNA">CISCO Certified Network Associate - CCNA</option>
                        <option value="Certificate in Records Management">Certificate in Records Management</option>
                        <option value="Certificate in Records Management for the Public Sector">Certificate in Records Management for the Public Sector</option>
                    </select>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateNotice;