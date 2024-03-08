const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.secret);
const app = express();
const cors = require("cors");
const axios = require("axios");

admin.initializeApp();

// Add middlewares
app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const YOUR_DOMAIN = "http://localhost:5173";

async function getZoomToken() {
  const zoomClientId = functions.config().zoom.client_id;
  const zoomClientSecret = functions.config().zoom.client_secret;
  const zoomAccountId = functions.config().zoom.account_id;

  const zoomTokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`;
  const authHeader = 'Basic ' + Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString('base64');

  try {
    const response = await axios.post(zoomTokenUrl, {}, {
      headers: {
        Authorization: authHeader,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Zoom token:', error);
    throw new Error('Failed to get Zoom token');
  }
}

exports.createZoomMeeting = functions.https.onCall(async (data, context) => {
  // Authenticate the user; context.auth contains the user's auth information
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated",
        "The function must be called while authenticated.");
  }

  const accessToken = await getZoomToken(); // Use the function from step 2
  const createMeetingUrl = `https://api.zoom.us/v2/users/me/meetings`;
  const coachId = data.coachId; // Get the coach ID from the request

  // Ensure startTime is passed in ISO 8601 format and duration is in minutes
  const meetingSettings = {
    topic: data.topic || 'Scheduled Meeting Topic', // You can allow users to set a topic
    type: 2, // Type 2 for a scheduled meeting
    start_time: data.start_time, // Expected to be in ISO format: 'YYYY-MM-DDTHH:MM:SSZ'
    duration: data.duration, // Duration in minutes
    timezone: data.timezone, // Set timezone or default to UTC
    settings: {
      host_video: data.hostVideo || true,
      participant_video: data.participantVideo || true,
      password: data.password || "", // Optional: set a meeting password
    },
  };

  try {
    const response = await axios.post(createMeetingUrl, meetingSettings, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const meetingData = {
      meetingID: response.data.id,
      joinURL: response.data.join_url,
      start_time: response.data.start_time,
      coachId: coachId,
      // Add any other meeting details you want to store
    };

    // Reference to the user's document in Firestore
    const userDocRef = admin.firestore().collection('users').doc(context.auth.uid);
    // Create a new document for the meeting under the user's document
    await userDocRef.collection('meetings').add(meetingData);

    const coachDocRef = admin.firestore().collection('coaches').doc(coachId);
    await coachDocRef.collection('meetings').add(meetingData);

    return meetingData;

    // return { meetingID: response.data.id, joinURL: response.data.join_url, start_time: response.data.start_time};
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create Zoom meeting');
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

    // Price for 60-minute appointment
    const price60 = await stripe.prices.create({
      unit_amount: data.hourlyRate * 100, // Assuming data.hourlyRate is for a 60-minute session
      currency: "usd",
      product: product.id,
    });

    // Price for 30-minute appointment (half of the 60-minute price)
    const price30 = await stripe.prices.create({
      unit_amount: (data.hourlyRate / 2) * 100, // Half of the hourly rate
      currency: "usd",
      product: product.id,
    });

    // Update the Firestore database with the new Stripe product ID and price ID
    const userRef = admin.firestore()
        .collection("coaches")
        .doc(context.auth.uid);
    await userRef.update({
      stripeProductId: product.id,
      stripePrice60Id: price60.id,
      stripePrice30Id: price30.id,
    });

    return { 
      productId: product.id,
      price60Id: price60.id,
      price30Id: price30.id
    };
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
