import React from 'react';
import './BookCard.css';

const BookCard = (props) => {
    const { bookName, authorName, price, cover } = props.details;
    return (
        <div className="book-card">
            <div className="book-cover">
            </div>
            <div className="about-book">
                <div className="names">
                    <div className="book-name">
                        {bookName}
                    </div>
                    <div className="author-name">
                        {authorName}
                    </div>
                </div>
                <div className="price-buy">
                    <div className="price">
                        {price}
                    </div>
                    <button> Buy Now</button>
                </div>
            </div>
            {bookName}
        </div>
    );
};

export default BookCard;