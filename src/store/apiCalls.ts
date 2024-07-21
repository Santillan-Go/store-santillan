import { NEXTAUTH_URL } from "@/config";
import { addToCart, removeOneFromCart, RemoveFromCart } from "./cartRedux";
import { CartProduct } from "@/types";

interface Props {
  dispatch: (action: any) => void;
  product: CartProduct;
  userId: string;
}

export const addtocart = async ({ dispatch, product, userId }: Props) => {
  const { id, price, quantity, title, category, image } = product;
  dispatch(addToCart({ id, price, quantity, title, category, image }));
  const res = await fetch(`${NEXTAUTH_URL}/api/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, price, quantity, title, category, image }),
  });
};

export const removeonefromcart = async ({
  dispatch,
  product,
  userId,
}: Props) => {
  const { id } = product;

  dispatch(removeOneFromCart({ id }));
  const res = await fetch(`${NEXTAUTH_URL}/api/cart/deleteone/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};

export const removefromcart = async ({ dispatch, product, userId }: Props) => {
  const { id } = product;
  dispatch(RemoveFromCart({ id }));
  const res = await fetch(`${NEXTAUTH_URL}/api/cart/deleteall/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};
