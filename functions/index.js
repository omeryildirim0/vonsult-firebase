const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

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
