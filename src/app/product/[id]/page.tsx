import { Product } from "@/types";

import { Metadata } from "next";
import { ViewProduct } from "@/Components/ViewProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
async function getById(id: string) {
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await data.json();
  return product;
}

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
  };
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const product: Product = await getById(params.id);
  return {
    title: `${product.title}`,
    description: "Product Page",
  };
}

async function ProductPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // noStore();
  const session = await getServerSession(authOptions);

  const product: Product = await getById(params.id);
  // const AddtoCartWithId = AddtoCart.bind(null, {
  //   product: Number(params.id),
  //   user: 0,
  // });
  return <ViewProduct product={product} session={session} />;
}

export default ProductPage;
