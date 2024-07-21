"use server";
import { RemoveRealFromCart } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/types";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  //product has to have (id) , price
  const product = await req.json();

  try {
    const res = await RemoveRealFromCart({
      user: params.id,
      product: product.id,
    });

    return NextResponse.json({
      message: `product remove seccessfully ${product.id}`,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
