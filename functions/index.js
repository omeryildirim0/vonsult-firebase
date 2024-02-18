const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.secret);
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const axios = require("axios");
app.use(cors({origin: true}));


admin.initializeApp();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const YOUR_DOMAIN = "http://localhost:5173";

exports.createStripeProduct = functions.https.onCall(async (data, context) => {
  // Authenticate the user; context.auth contains the user's auth information
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated",
        "The function must be called while authenticated.");
  }
  try {
    const product = await stripe.products.create({
      name: data.fullName,
      description: data.bio,
    });

    const price = await stripe.prices.create({
      unit_amount: data.hourlyRate * 100, // Convert to cents
      currency: "usd",
      product: product.id,
    });

    // Update the Firestore database with the new Stripe product ID and price ID
    const userRef = admin.firestore()
        .collection("coaches")
        .doc(context.auth.uid);
    await userRef.update({
      stripeProductId: product.id,
      stripePriceId: price.id,
    });

    return {productId: product.id, priceId: price.id};
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// Stripe Checkout session creation endpoint
app.post("/create-checkout-session", async (req, res) => {
  // Make sure to send priceId from the frontend
  const {priceId, appointmentId} = req.body;
  try {
    const returnUrl = `${YOUR_DOMAIN}/success` +
                      `?session_id={CHECKOUT_SESSION_ID}` +
                      `&appointment_id=${appointmentId}`;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: priceId, // Use the price ID sent from the frontend
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: returnUrl,
      // cancel_url: `${YOUR_DOMAIN}/cancel`,
      automatic_tax: {enabled: true},
    });

    res.json({sessionId: session.id});
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

// Retrieve session status endpoint
app.get("/session-status", async (req, res) => {
  // Use the session ID from the query
  const {session_id: sessionId} = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send({
      status: session.payment_status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

// Export the API to Firebase Cloud Functions
exports.api = functions.https.onRequest(app);
