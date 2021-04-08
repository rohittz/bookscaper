import React, { createContext, useContext, useEffect, useState } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import { historyContext, userContext } from '../../App';
import { nodeModuleNameResolver } from 'typescript';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [currComp, setCurrComp] = useContext(historyContext);
    let savedPaths = useHistory();
    const [hide, setHide] = useState({ display: "none" });
    const handleMenuIcon = () => {
        const newHide = { ...hide };
        if (hide.display === "none") {
            newHide.display = "grid";
        }
        else {
            newHide.display = "none";
        }
        setHide(newHide);
    }
    // handle goToLogin button
    const goToLogin = (event) => {
        if (loggedInUser?.isSignedIn) {
            savedPaths.push({
                pathname: '/checkout',
                state: { book: null }
            });
        }
        else {
            savedPaths.push("/login");
        }
        setCurrComp("/login");
    }
    const goToHome = () => {
        savedPaths.push("/home");
        setCurrComp("/home")
    }
    const goToOrders = () => {
        savedPaths.push("/orders");
        setCurrComp("/orders");
    }
    const goToAdmin = () => {
        savedPaths.push("/admin/managebooks");
        setCurrComp("/admin");
    }
    return (
        <div>
            <div className="header-container">
                <div className="header">
                    <span className="header-name">BookScape</span>
                </div>
                <div className="menu-icon-container">
                    <FontAwesomeIcon onClick={handleMenuIcon} className="menu-icon" icon={faBars} />
                </div>
                <div style={hide} className="menu-container">
                    <div className="menu">
                        <div className={`menu-item ${currComp === "/home" ? "mark" : "nomark"}`} onClick={goToHome}>Home</div>

                        <div className={`menu-item ${currComp === "/orders" ? "mark" : "nomark"}`} onClick={goToOrders}>Orders</div>

                        <div className={`menu-item ${currComp === "/admin" ? "mark" : "nomark"}`} onClick={goToAdmin}>Admin</div>



                        <div className="menu-item">Deals</div>

                        <div className={`menu-item ${currComp === "/login" || currComp === "/checkout" ? "mark" : "nomark"}`} onClick={goToLogin}>{loggedInUser?.isSignedIn ? "Checkout" : "Login"}</div>
                    </div>
                </div>
                {
                    loggedInUser?.isSignedIn &&
                    <div className="user-photo">
                        <img src={loggedInUser?.photo} alt={loggedInUser.name} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;