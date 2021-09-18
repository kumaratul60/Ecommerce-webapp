// creating API end point
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  //   console.log(items);
  //   console.log(email);

  //  items.map(item => ({xyz,pqr})) ==> that is implicit return

  // in stripe they take every curruncy as sub currency which means that if we talk about pounds it can be pannies or if we talk about doller it can be sense.   100 pannies = 1 Pounds

  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image], // image expect array
      },
    },
  }));

  // checkout session
  const session = await stripe.checkout.sessions.create({
    //   payment method is array type because it can be used as multiple payment methods
    payment_method_types: ["card"],

    shipping_rates: ["shr_1J7FLaSIZXyOYAkIH5JkVaeM"],
    shipping_address_collection: {
      allowed_countries: ["CA", "US", "IN", "GB"],
    },

    // line_items -> all the object that having map order so in this case transformedItems is line_items
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
      //  JSON.stringify -> make a array in one massive string
    },
  });
  res.status(200).json({ id: session.id });
};
