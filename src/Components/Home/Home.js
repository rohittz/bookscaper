import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import './Home.css'

const Home = () => {
    const [allBooos, setAllBooks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3005/allbooks')
            .then(res => res.json())
            .then(data => {
                setAllBooks(data);
            })
    }, [])
    return (
        <div className="books-container">
            {
                allBooos.map(book =>
                    <BookCard details={book}></BookCard>
                )
            }
        </div>
    );
};

export default Home;