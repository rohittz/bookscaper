import { faChevronRight, faEdit, faPlus, faThLarge, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import AddBooks from '../AddBooks/AddBooks';
import ManageBooks from '../ManageBooks/ManageBooks';
import './Admin.css';
const Admin = () => {
    const adminPath = useHistory();
    const [sideBarHide, setSideBarHide] = useState(true);
    const [currSide, setCurrSide] = useState('/admin/managebooks');
    const handleSideBar = () => {
        if (sideBarHide) {
            document.getElementsByClassName('sidebar-admin')[0].style.display = 'flex';
            setSideBarHide(false);
        }
        else {

            document.getElementsByClassName('sidebar-admin')[0].style.display = 'none';
            setSideBarHide(true);
        }
    }
    const goToManageBooks = () => {
        adminPath.push('/admin/managebooks');
        setCurrSide('/admin/managebooks')
    }
    const goToAddBooks = () => {
        adminPath.push('/admin/addbooks');
        setCurrSide('/admin/addbooks')
    }
    return (
        <div className="admin-container">
            <div className="sidebar-admin">
                <div className={`option-admin ${currSide === "/admin/managebooks" ? "markad" : "nomarkad"}`} onClick={goToManageBooks}>
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faThLarge} /></div>
                    <div className="op-name">Manage Books</div>
                </div>
                <div className={`option-admin ${currSide === "/admin/addbooks" ? "markad" : "nomarkad"}`} onClick={goToAddBooks}>
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faPlus} /></div>
                    <div className="op-name">Add Books</div>
                </div>
                <div className="option-admin">
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faEdit} /></div>
                    <div className="op-name">Edit Book</div>
                </div>
            </div>
            <div className="showIcon" onClick={handleSideBar}>

                {
                    sideBarHide ?
                        <div className="icon-container"><FontAwesomeIcon className="" icon={faChevronRight} /></div>
                        :
                        <div className="icon-container"><FontAwesomeIcon className="" icon={faTimes} /></div>
                }
            </div>
            <div className="maintab-admin">
                <Switch>
                    <Route path='/admin/managebooks'>
                        <ManageBooks></ManageBooks>
                    </Route>
                    <Route path='/admin/addbooks'>
                        <AddBooks></AddBooks>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Admin;