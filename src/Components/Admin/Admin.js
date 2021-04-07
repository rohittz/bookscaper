import { faEdit, faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Admin.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="sidebar-admin">
                <div className="option-admin">
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faThLarge} /></div>
                    <div className="op-name">Manage Books</div>
                </div>
                <div className="option-admin">
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faPlus} /></div>
                    <div className="op-name">Add Books</div>
                </div>
                <div className="option-admin">
                    <div className="icon-container"><FontAwesomeIcon className="option-icon" icon={faEdit} /></div>
                    <div className="op-name">Edit Book</div>
                </div>
            </div>
            <div className="maintab-admin">

            </div>
        </div>
    );
};

export default Admin;