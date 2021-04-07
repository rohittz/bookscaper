import React, { useContext, useEffect, useState } from 'react';
import bookImage from '../../images/book-lover.svg';
import { useHistory, useLocation } from 'react-router';
import { historyContext, userContext } from '../../App';
import { handleCreateAccount, handleEmailSignIn, handleGoogleSignIn, initializeFirebaseApp } from './LoginManager';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import userIcon from '../../images/peopleicon.png'
initializeFirebaseApp();
let isPassValid = false;
let isEmailValid = false;
const Login = () => {
    //handle currcomp
    const [currComp, setCurrComp] = useContext(historyContext);
    useEffect(() => {
        setCurrComp("/login");
    })
    // handle field data
    const [validField, setValidField] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const fromPath = useHistory();
    const pastLocation = useLocation();
    let { from } = pastLocation.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: userIcon,
        password: ''
    });
    // user is created to save the client side information and use it to communicate with firebase
    const [error, setError] = useState({
        isErrorOccured: false,
        code: '',
        message: ''
    });
    // to handle when to show create account page or login page
    const [signIn, setSignIn] = useState(true);
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                if (pastLocation.state) {
                    fromPath.replace(from);
                }
                else {
                    fromPath.push("/home");
                    setCurrComp("/home");
                }
            })
    }
    const emailSignIn = (e) => {
        handleEmailSignIn(user)
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                if (pastLocation.state) {
                    fromPath.replace(from);
                }
                else {
                    fromPath.push("/home");
                    setCurrComp("/home");
                }
            })
        e.preventDefault();
    }
    const createAccount = (e) => {
        handleCreateAccount(user)
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                console.log(loggedInUser);
                if (pastLocation.state) {
                    fromPath.replace(from);
                }
                else {
                    fromPath.push("/home");
                    setCurrComp("/home");
                }
            })
        e.preventDefault();
    }
    const createNew = (property, value) => {
        const newUser = { ...user };
        newUser[property] = value;
        setUser(newUser);
    }
    const handleBlur = (event) => {
        if (event.target.name === "email") {
            isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
            createNew("email", event.target.value);
        }
        if (event.target.name === "password") {
            isPassValid = /\d{1}/.test(event.target.value) && event.target.value.length > 6;
            createNew("password", event.target.value);
        }
        if (event.target.name === "name") {
            createNew("name", event.target.value);
        }
        if (isPassValid && isEmailValid) {
            setValidField(true);
        }
        else {
            setValidField(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-illus">
                <img src={bookImage} alt="book-lover" />
            </div>
            <div className="login">
                <div className="pageType">{signIn ? "LOG IN" : "CREATE ACCOUNT"}</div>
                <form onSubmit={handleBlur} className="form">
                    {
                        !signIn &&
                        <div className="inputbox">
                            <input type="text" onBlur={handleBlur} placeholder="Name" name="name" required />
                        </div>
                    }
                    <div className="inputbox">
                        <input type="email" name="email" onChange={handleBlur} placeholder="Email" required />
                        {
                            !isEmailValid &&
                            <div id="condition">
                                "Example: abc@gmail.com"
                        </div>
                        }
                    </div>
                    <div className="inputbox">
                        <input type="password" onChange={handleBlur} placeholder="Password" name="password" required />
                        {
                            !isPassValid &&
                            <div id="condition">
                                Password's length must be greater than 6 and it must contain at least one number
                        </div>
                        }
                    </div>

                    <div className="buttons">
                        <button type="submit" onClick={!signIn ? createAccount : emailSignIn} className="button" id={`${validField ? 'active' : "disabled"}`} disabled={!validField}>{!signIn ? "CREATE ACCOUNT" : "SIGN IN"} </button>
                        <span>Don't have an account?</span>
                        <div onClick={() => setSignIn(signIn ? false : true)} className="createnewacc" >{!signIn ? "SIGN IN" : "Create an account"}</div>
                    </div>
                </form>

                <span>or</span>
                <div className="login-third" onClick={googleSignIn}>
                    <span className="iconbox">
                        <FontAwesomeIcon className="icon" icon={faGoogle} />
                    </span>
                    <span className="third-text">Login with Google</span>
                </div>
            </div>
            {
                loggedInUser?.isErrorOccured &&
                <div className="message">
                    {
                        user?.isErrorOccured ? user.message : (user?.isSignedIn ? "success" : "")
                    }
                </div>
            }
        </div>
    );
};

export default Login;