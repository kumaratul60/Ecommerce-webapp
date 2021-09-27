import { buffer } from "micro";
import * as admin from "firebase-admin";

// Source a connection to FIREBASE from the backend
const serviceAccount = require("../../../amzn-2-545d9-firebase-adminsdk-permissionKey.json"); // "../"-> upper directory

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
      amount: session.amount_total / 100, // x/100 bcoz we use subcurrency so we get back to regular reading currency when we pushing database

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

    //  raw body       ^^^^^^^^^^^^^^
    const sig = req.headers["stripe-signature"];
    console.log(sig);

    let event;

    // Verify that the EVENT posted came from stripe

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
      // body of request, already raw        ^^^^^^^^
    } catch (err) {
      // On error, log and return the error message
      console.log("Error", err.message);
      return res.status(400).send(` ❌ Webhook error: ${err.message}`);
    }
    // Successfully constructed event
    console.log("✅ Success:", event.id);

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
// Return a response to acknowledge receipt of the event
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// proceed to checkout --> create stripe checkout session --> webhooks --> firebase database
//                                                              |
//                                                              -->    success

// .\stripe listen --forward-to localhost:3000/api/webhook


