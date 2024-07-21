"use server";
import { AddRealtoCart, getRealCart } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types";

// GET ALL ITEMS FROM CART FOR SPECIFYC USER
export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const cartUser = await getRealCart(params.id);

    return NextResponse.json(cartUser[0].result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "bad!" }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  //we should receive idproduct from product {id, price, etc  }
  const product = await req.json();
  const id = params.id;

  try {
    const result = await AddRealtoCart({
      product: product.id,
      user: id,
      price: product.price,
    });

    return NextResponse.json({ userId: id, ...product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
