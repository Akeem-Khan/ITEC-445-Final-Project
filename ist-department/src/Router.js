import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Activate from "./components/auth/activate.component";

import Navbar from "./components/layout/nav.layout";
import AuthContext from "./context/auth.context";
import Cal from "./components/calender"

import CreateNotice from "./components/notice/create-notice.component";
import EditNotice from "./components/notice/edit-notice.component";
import NoticeList from "./components/notice/notice-list.component";

import Profile from "./components/auth/profile.component";
import StudentList from "./components/faculty/confirm-student.component";

function Router() {
    const { user } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar/>

            <Switch>
                <Route path="/" exact component={NoticeList}/>
                <Route path="/activate/:token" component={Activate}/>

                {user !== undefined && (
                    <>
                        {user.loggedIn === false && (
                            <>
                                <Route path="/register">
                                    <Register/>
                                </Route>

                                <Route path="/login">
                                    <Login/>
                                </Route>

                               
                            </>
                        )}

                        {((user.role === 'student_leader') || (user.role === 'faculty')) && (
                            <>
                                <Route path="/edit/:id" component={EditNotice}/>
                                <Route path="/create" component={CreateNotice}/>
                            </>
                        )}

                        {user.loggedIn === true && (
                            <><Route path="/profile" component={Profile} />
                              <Route path="/cal" component={Cal} />
                              </>
                            
                        )}

                        {user.role === 'faculty' && (
                           <> <Route path="/confirm" component={StudentList}/>
                              <Route path="/cal" component={Cal} />
                           </>
                        )}
                    </>
                )}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
