import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@chakra-ui/react';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
            return;
        }

        // Process payment here
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <Button mt="4" colorScheme="blue" type="submit" disabled={!stripe}>
                Pay {amount}
            </Button>
        </form>
    );
};

export default CheckoutForm;
