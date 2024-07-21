"use client";

import { CartProduct, CartState, Id, Price, Quantity } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  cart: [],
  quantity: 0,
  total: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex === -1) {
        state.cart.push({ ...product, quantity: 1 });
      } else {
        state.cart[existingProductIndex].quantity++;
      }
      /// const res = await fetch("htpp://localhost/api/cart");
      state.quantity++;
      state.total += product.price;
    },
    RemoveFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const price = state.cart[itemIndex].price;
        const itemQuantity = state.cart[itemIndex].quantity;
        state.total -= price * itemQuantity;
        state.quantity -= itemQuantity;
        state.cart.splice(itemIndex, 1);
      }
    },
    removeOneFromCart: (state, action) => {
      const { id } = action.payload;
      const existingProductIndex = state.cart.findIndex((p) => p.id === id);
      if (existingProductIndex !== -1) {
        const price = state.cart[existingProductIndex].price;
        state.total -= price;
        state.quantity -= 1;
        if (state.cart[existingProductIndex].quantity > 1) {
          state.cart[existingProductIndex].quantity--;
        } else {
          state.cart.splice(existingProductIndex, 1);
        }
      }
    },
    GetAllProduct: (
      state: CartState,
      action: {
        payload: { cart: CartProduct[]; quantity: number; total: number };
      }
    ) => {
      const { cart, quantity, total } = action.payload;
      if (cart && quantity && total) {
        state.cart = cart;
        state.quantity = quantity;
        state.total = total;
      }

      // state.quantity = action.payload.reduce((acc, product) => acc + product.quantity, 0);
      // state.total = action.payload.reduce((acc, product) => acc + product.price * product.quantity, 0);
    },
  },
});

export const { RemoveFromCart, addToCart, removeOneFromCart, GetAllProduct } =
  CartSlice.actions;

export const CartReducer = CartSlice.reducer;
