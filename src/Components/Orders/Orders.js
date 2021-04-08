import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { userContext } from '../../App';
import './Orders.css'

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://bookscape-server.herokuapp.com/orders?email=' + loggedInUser.email, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                console.log(data);
            }
            );
    }, [])
    return (
        <div className="orders-container">
            <div className="orders">
                <div className="single-order">
                    <div>Book Name</div>
                    <div>Date</div>
                    <div>Price</div>
                </div>
                {
                    orders.map(order => <div key={`${order._id}`} className="single-order">
                        <div>{order.bookName}</div>
                        <div>{new Date(order.date).toDateString('DD/MM/YYYY')}</div>
                        <div>${order.price}</div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Orders;