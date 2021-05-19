import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyCheckoutForm from './MyCheckoutForm';
const stripePromise = loadStripe(
    'pk_test_51IegQVIXbkiXhA81qzT5hRxNf4G95VSk4hQPcT56hrj5k7ha7D6WYXnjgdfW1oCzTag1uniWmSUcy57vfWHp3V8X000kPxKhLc'
);

const ProcessPayment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <MyCheckoutForm />
            </Elements>
        </div>
    );
};

export default ProcessPayment;
