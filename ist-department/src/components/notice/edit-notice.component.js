import React, {Component} from 'react';
import axios from 'axios';

export default class EditNotice extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            title: '',
            text: '',
            category: '',
            author: '',
            flagged: {
                is_flagged: false,
                info: '',
                by: '',
            },
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/notices/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    text: response.data.text,
                    category: response.data.category,
                    author: response.data.author,
                    flagged: {
                        is_flagged: response.data.flagged.is_flagged,
                        info: response.data.flagged.info,
                        by: response.data.flagged.by,
                    },
                })
                console.log("TEST");
            })
            .catch(function(err) {
                console.log(err)
            })
        console.log(this.state)
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const notice = {
            title: this.state.title,
            text: this.state.text,
            category: this.state.category,
            author: this.state.author,
            flagged: {
                is_flagged: this.state.flagged.is_flagged,
                info: this.state.flagged.info,
                by: this.state.flagged.by,
            },
        };

        axios.post('http://localhost:4000/notices/update/'+this.props.match.params.id, notice)
            .then(res => console.log(res.data));
    }

    onDelete() {
        axios.delete('http://localhost:4000/notices/update/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h3>Update Notice</h3>
                <p>Author: {this.state.author}</p>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Text: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.text}
                            onChange={this.onChangeText}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category: </label>
                        <br/>
                        <select value={this.state.category} onChange={this.onChangeCategory}>
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
                        &nbsp; &nbsp;
                        <input type="button" value="Delete" onClick={this.onDelete} className="btn btn-danger" />
                    </div>
                </form>

                {this.state.flagged.is_flagged && (
                    <>
                        <br/>
                        <p style={{color: "red"}}>Warning {this.state.flagged.info}, changes will be saved but not displayed.</p>
                    </>
                )}
            </div>
        );
    }
}