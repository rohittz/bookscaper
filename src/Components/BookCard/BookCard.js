import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { historyContext } from '../../App';
import './BookCard.css';

const BookCard = (props) => {
    const [currComp, setCurrComp] = useContext(historyContext);
    let history = useHistory();
    const { bookName, authorName, price, cover } = props.details;
    const goToCheckout = (bookName, authorName, price, cover) => {
        const checkedBook = { bookName, authorName, price, cover };
        history.push({
            pathname: '/checkout',
            state: { book: checkedBook }
        });
        setCurrComp('/checkout');
    }
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
                        <button onClick={() => goToCheckout(bookName, authorName, price, cover)} className="buynow"> Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;