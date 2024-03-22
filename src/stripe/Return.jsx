import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // Extract the session ID from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('sessionId');

    fetch(`/session-status?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>We appreciate your business! If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.</p>
      </section>
    );
  }

  return null; // or some loading indicator
};

export default Return;
