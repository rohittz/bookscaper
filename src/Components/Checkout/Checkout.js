import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { userContext } from '../../App';
import './Checkout.css';
import Payment from './Payment';

const Checkout = (props) => {
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [isOrdered, setIsOrdered] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    let bookName = '';
    let authorName = '';
    let cover = '';
    let price = '';
    if (location.state.book !== null) {
        bookName = location.state.book.bookName;
        authorName = location.state.book.authorName;
        price = location.state.book.price;
        cover = location.state.book.cover;
    }
    const handleCheckout = (event) => {
        event.preventDefault();
        const topMargin = event.target.scrollWidth;
        const date = new Date();
        const newBook = { bookName, cover, price, authorName };
        const newCheckedBook = { ...loggedInUser, ...newBook, date };
        fetch('https://bookscape-server.herokuapp.com/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCheckedBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setIsOrdered(true);
                    setShowPayment(true);
                    document.getElementsByClassName("payment-tab")[0].style.display = "block";
                    document.getElementsByClassName("checkout-container")[0].style.pointerEvents = "none";
                    document.getElementsByClassName("payment-tab")[0].style.pointerEvents = "auto";
                    setTimeout(() => {
                        setIsOrdered(false);
                    }, 3000);
                }
            })
    }
    return (
        <div className="checkout-container">
            {
                showPayment &&
                <Payment></Payment>
            }
            {
                isOrdered &&
                <div className="addStatus">
                    One book is ordered successfully
                </div>
            }
            {
                bookName === '' ?
                    <div className="no-book">There is no book in your checkout for now. Go to 'orders' to get the list of all your orders. </div> :
                    <div className="checkout">
                        <div className="checkout-inner">
                            <div style={{ backgroundImage: `url(${cover})` }} className="check-cover">
                            </div>
                            <div className="check-info">
                                <div className="book-name">
                                    {bookName}
                                </div>
                                <div className="author-name">
                                    {authorName}
                                </div>
                                <div className="price">
                                    ${price}
                                </div>
                                <div className="checkout-button">
                                    <form action="">
                                        <button onClick={handleCheckout}>Checkout</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>


    );
};

export default Checkout;