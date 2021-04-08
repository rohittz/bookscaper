import React from 'react';
import './BookCard.css';

const BookCard = (props) => {
    const { bookName, authorName, price, cover } = props.details;
    return (
        <div className="book-card">
            <div style={{ 'backgroundImage': `url(${cover})` }} className="book-cover">
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
                    <div>
                        <div className="price">
                            ${price}
                        </div>
                        <button className="buynow"> Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;