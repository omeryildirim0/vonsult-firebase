/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(sk_test_51Ogs1vD1CJUmd99lgWYjGiQlEXnhCmE1ham4P9sD3QYHNyNIpbWSaHyDdvD5JhfWlHgPQm0zeKGDl9u3ph5rTTqg00RUOwh1LS);

admin.initializeApp();

exports.createStripeCharge = functions.firestore.document('appointments/{appointmentId}').onCreate(async (snap, context) => {
    const appointment = snap.data();
    const amount = appointment.price; // Ensure this is in the smallest currency unit (e.g., cents)
    const currency = 'usd';

    try {
        const charge = await stripe.charges.create({
            amount,
            currency,
            source: appointment.paymentMethodId, // The ID of a Stripe PaymentMethod
            // You might want to add other Stripe charge options here
        });

        // Here, you could update Firestore with the payment status
        // For example, marking the appointment as paid
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
