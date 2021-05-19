import React from 'react';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Payment.css';

const Payment = () => {
    return (
        <div className="payment-tab">
            <ProcessPayment></ProcessPayment>
        </div>
    );
};

export default Payment;