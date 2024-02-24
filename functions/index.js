const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.secret);
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
app.use(cors({origin: true}));

admin.initializeApp();

// Add middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const YOUR_DOMAIN = "http://localhost:5173";

// Zoom OAuth endpoint to get the access token
const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';
const ZOOM_MEETING_ENDPOINT = 'https://api.zoom.us/v2/users/me/meetings';

// Your Zoom app credentials
const CLIENT_ID = 'txk9wfw0THOgOXCTxJyokg'; // Replace with your client ID
const CLIENT_SECRET = 'ejOO6rA1sVVKvcmSTpst1PUHKqqPlaat'; // Replace with your client secret
const ACCOUNT_ID = '95ChnYWlT8yFfbOtVkDL7A'; // Replace with your account ID

exports.getZoomAccessToken = functions.https.onCall(async (data, context) => {
  // Encoding client ID and client secret in base64 format
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    // Making a POST request to the Zoom OAuth endpoint
    const response = await axios.post(ZOOM_OAUTH_ENDPOINT, `grant_type=account_credentials&account_id=${ACCOUNT_ID}`, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Returning the access token
    return {
      access_token: response.data.access_token,
      expires_in: response.data.expires_in,
      scope: response.data.scope
    };
  } catch (error) {
    // Logging the error to the console
    console.error('Error getting Zoom access token:', error);
    
    // Throwing an HTTPS error for the client to handle
    throw new functions.https.HttpsError('internal', 'Failed to get Zoom access token', error.toString());
  }
});

exports.createZoomMeeting = functions.https.onCall(async (data, context) => {
  // Log the incoming request data for debugging
  console.log('Request data:', data);

  // Ensure the user is authenticated
  if (!context.auth) {
    console.error('Unauthenticated request:', context);
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  try {
    // Obtain the Zoom access token using the provided function
    const accessTokenData = await exports.getZoomAccessToken({}, context);
    const accessToken = accessTokenData.access_token;

    // Log the access token data for debugging
    console.log('Access token data:', accessTokenData);

    // Prepare the request payload for creating a new Zoom meeting
    const meetingData = {
      topic: data.topic, // Customize your meeting topic here
      type: 2, // Scheduled meeting
      start_time: data.start_time, // Set your desired start time
      duration: data.duration, // Set your desired duration in minutes
      timezone: 'UTC', // Set your desired timezone
      settings: {
        host_video: true,
        participant_video: true,
      },
    };

    // Log the meeting data for debugging
    console.log('Meeting data:', meetingData);

    // Make the POST request to Zoom API to create the meeting
    const response = await axios.post(ZOOM_MEETING_ENDPOINT, meetingData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Log the response for debugging
    console.log('Zoom response:', response.data);

    // Return the meeting details, including the join URL
    return {
      join_url: response.data.join_url,
      start_time: response.data.start_time,
      topic: response.data.topic,
    };
  } catch (error) {
    // Log the error with more details
    console.error('Error creating Zoom meeting:', {
      errorMessage: error.message,
      errorStack: error.stack,
      requestData: data,
      authContext: context.auth,
      error: error,
    });

    // Throwing an HTTPS error for the client to handle
    throw new functions.https.HttpsError('internal', 'Failed to create Zoom meeting', error.toString());
  }
});


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
