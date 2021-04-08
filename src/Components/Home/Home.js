import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import './Home.css'

const Home = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        fetch('https://bookscape-server.herokuapp.com/allbooks')
            .then(res => res.json())
            .then(data => {
                setAllBooks(data);
            })
    }, [])
    return (
        <div className="books-container">
            {
                allBooks.length === 0 &&
                <div className="spinner">
                    <FontAwesomeIcon className="spinner-icon" icon={faCompactDisc} />
                </div>
            }
            {
                allBooks.map(book =>
                    <BookCard key={`${book._id}`} details={book}></BookCard>
                )
            }
        </div>
    );
};

export default Home;