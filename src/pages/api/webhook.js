import { buffer } from "micro";
import * as admin from "firebase-admin";

// Source a connection to FIREBASE from the backend
const serviceAccount = require("../../../permissionKey.json"); // "../"-> upper directory

// To protect from double(do not initialize app twice) initialization and Secure a connection to FIREBASE from the backend
const app = !admin.apps.length //  if no app already initialize then we initialize the app
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount), // cert -> certificate key
    })
  : admin.app();

// Establish connection to STRIPE
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

// fulfillOrder is a async function which is take session as argument
const fulfillOrder = async (session) => {
  // console.log("Fulfilling order", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")  
    .doc(session.id)
    .set({
      amount: session.amount_total / 100, // x/100 bcoz we use subcurrency so we get back to regular reading currency when
      // we pushingg database
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} had been added to the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verify that the EVENT posted came from stripe

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (err) {
      console.log("Error", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle the checkout.session.completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order...
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    }
  }
};

// Changing the api setting to handle the bodyparser
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// stripe listen --forward-to localhost:3000/api/webhook
