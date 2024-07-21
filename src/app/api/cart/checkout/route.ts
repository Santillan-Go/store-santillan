import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const SECRET_KEY: any = process.env.SECRET_KEY;
const stripe = new Stripe(SECRET_KEY);

export const POST = async (req: NextRequest) => {
  // GET DATA FROM REQ
  // console.log(json);
  const { title, total, description, image, endpoint } = await req.json();
  const endpointRender =
    endpoint === "cart"
      ? `${process.env.NEXTAUTH_URL}/cart`
      : `${process.env.NEXTAUTH_URL}`;
  try {
    const response = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: total * 100, // $200 usd
            product_data: {
              name: title,
              description: description,
              images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4LnVzeTSdIUpSsj351mbek2gKD9ac7x7HQ&s",
              ],
            },
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: endpointRender,
    });

    console.log(response);

    return NextResponse.json({ url: response.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create checkout session" },
      { status: 500 }
    );
  }
};

/*

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: id.id,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/pricing`,
  });
  return NextResponse.json({ url: session.url });
}

*/

/*
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: 20000, //$200 usd
          product_data: {
            name: "Premium Plan",
            description: "Unlimited access to your premium features",
          },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "usd",
          unit_amount: 10000, //$100 usd
          product_data: {
            name: "Basic Plan",
            description: "Limited access to your basic features",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",

    success_url: `http://localhost:4000/success`,
    cancel_url: `http://localhost:4000/cancel`,
  });

*/
