import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './ManageBooks.css'

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        fetch('https://bookscape-server.herokuapp.com/allbooks')
            .then(res => res.json())
            .then(data => {
                setAllBooks(data);
            })
    }, [])
    const deleteThis = (id, event) => {
        fetch('https://bookscape-server.herokuapp.com/delete?id=' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    // reload to see this
                }
            })
    }
    return (
        <div className="managebooks-container">
            <div className="managebooks">
                {
                    allBooks.map(book => <div key={`${book._id}`} className="single-order">
                        <div>{book.bookName}</div>
                        <div>{book.authorName}</div>
                        <div>${book.price}</div>
                        <div className="delete" onClick={() => deleteThis(book._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageBooks;