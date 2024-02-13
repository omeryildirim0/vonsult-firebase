import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

// This is your test public API key.
const stripekey = 'pk_test_51Ogs1vD1CJUmd99lHC4lWLu1rP3iDfA04Ygd17fl4yy5ysyQd8x501bcmFn9vrMqwMUXSgOXosy6UvVvM12vsTlV0052blYUEv';
const stripePromise = loadStripe(stripekey);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch("/create-checkout-session", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default CheckoutForm;
