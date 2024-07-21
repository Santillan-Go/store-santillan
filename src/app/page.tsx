import ElectronicsProducts from "@/Components/ElectronicsProducts";
import JeweleryProducts from "@/Components/JeweleryProducts";
import Men_clothing from "@/Components/Men_clothing";
import { ProductsSqueleton } from "@/Components/Squeleton";
import Women_clothing from "@/Components/Women_clothing";
import { Metadata } from "next";

import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "The store where you can find anything you can think of",
};

async function app() {
  return (
    <section>
      <h1 className="font-bold text-3xl">Home</h1>

      <Suspense fallback={<ProductsSqueleton />}>
        <JeweleryProducts />
      </Suspense>
      <Suspense fallback={<ProductsSqueleton />}>
        <ElectronicsProducts />
      </Suspense>

      <Suspense fallback={<ProductsSqueleton />}>
        <Men_clothing />
      </Suspense>
      <Suspense fallback={<ProductsSqueleton />}>
        <Women_clothing />
      </Suspense>
    </section>
  );
}

export default app;
