import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth.context";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [role, setRole] = useState("");
  const [buttonText, setButtonText] = useState("Register");

  const { getUser } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();
    const isValidEmail = email.split('@');

    try {
      if(isValidEmail[1] === 'my.costaatt.edu.tt' || isValidEmail[1] === 'gmail.com'){
        const registerData = {
          name,
          email,
          password,
          passwordVerify,
          role:'student',
        };

        await axios.post("http://localhost:4000/auth/", registerData);
        await getUser();

        setButtonText("Email Sent");
        
        setTimeout(() => {
          history.push('/');
        }, 5000);
      }
      
      else if(isValidEmail[1] === 'costaatt.edu.tt'){
        const registerData = {
          name,
          email,
          password,
          passwordVerify,
          role:'faculty',
        };

        await axios.post("http://localhost:4000/auth/", registerData);
        await getUser();

        setButtonText("Email Sent");

        setTimeout(() => {
          history.push('/');
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <br/>

        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <br/>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <br/>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Verify your password"
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
            required
          />
        </div>

        <br/>

        <div className="form-group">
          <button className="btn btn-primary" type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
