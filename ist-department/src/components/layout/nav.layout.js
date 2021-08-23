import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth.context";
import LogOutBtn from "../auth/logout-btn.component";
import logo from "../../logo.png";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{display: "flex", justifyContent: "space-between"}}>
        <div style={{textAlign: "left"}}>
            <a className="navbar-brand" href="https://www.costaatt.edu.tt" target="_blank">
                <img src={logo} width="30" height="30" alt="COSTAATT" />
            </a>
            <Link to="/" className="navbar-brand">IST - Department</Link>
        </div>
        
        <div className="collpase nav-collapse" style={{textAlign: "right"}}>
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">Notices</Link>
                </li>

                {user !== undefined && (
                    <>
                        {user.loggedIn === false && (
                            <>
                                <li className="navbar-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Log in</Link>
                                </li>
                            </>
                        )}

                        {((user.role === 'student_leader') || (user.role === 'faculty')) && (
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Notice</Link>
                            </li>
                        )}

                        {user.role === 'faculty' && (
                            <li className="navbar-item">
                                <Link to="/confirm" className="nav-link">Confirm student leader</Link>
                            </li>
                        )}

                        {user.loggedIn === true && (
                            <>
                                <li className="navbar-item">
                                    <LogOutBtn />
                                </li>
                                <li className="navbar-item">
                                    <Link to="/profile" className="nav-link" style={{color: "#2E67FF"}}>&nbsp;{user.name}</Link>
                                </li>
                            </>
                        )}
                    </>
                )}
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;
