"use server";

import { CartProduct } from "@/types";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
interface CartProps {
  user: string;
  product: number;
  price?: number;
}

export async function getRealCart(id: string) {
  const res = await sql`WITH cart_items AS (
    SELECT
        p.id,
        p.title,
        p.price,
        p.image,
        pb.quantity
    FROM
        products p
    JOIN
        productsbyuser pb ON p.id = pb.id_product
    WHERE
        pb.id_user = ${id}
),
cart_total AS (
    SELECT
        SUM(pb.quantity * p.price) AS total,
        SUM(pb.quantity) AS quantity
    FROM
        productsbyuser pb
    JOIN
        products p ON pb.id_product = p.id
    WHERE
        pb.id_user = ${id}
)
SELECT json_build_object(
    'cart', (SELECT json_agg(json_build_object(
                'title', ci.title,
                'price', ci.price,
                'id', ci.id,
                'quantity', ci.quantity,
                 'image', ci.image
            ))
            FROM cart_items ci),
    'total', ct.total,
    'quantity', ct.quantity
) AS result
FROM cart_total ct;`;

  return res.rows;
}

export async function removeRealFromOneCart({ user, product }: CartProps) {
  const result = await sql`
  
SELECT decrement_quantity_or_delete(${user}, ${product});
  `;
}

export async function AddRealtoCart({ user, product, price }: CartProps) {
  const result = await sql`
 

SELECT add_to_cart(${user}, ${product}, 1, ${price});
  `;
  return result;
}

export async function RemoveRealFromCart({ user, product }: CartProps) {
  const createFunction = await sql`
 
 CREATE OR REPLACE FUNCTION delete_all_of_product(
    p_id_user VARCHAR,
    p_id_product INT
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM productsbyuser
    WHERE id_user = p_id_user AND id_product = p_id_product;
END $$ LANGUAGE plpgsql;
`;
  const result = await sql`
SELECT delete_all_of_product(${user}, ${product});

`;

  return result;
}

export async function GetUserById(id: string) {
  const user = await sql`SELECT * FROM users WHERE id=${id}`;
  return user.rows[0];
}

//OLD FUNCTIONS  ===>
export async function AddtoCart({ user, product }: CartProps) {
  const ishere =
    await sql`SELECT * FROM productsbyuser  WHERE  id_user=${user} AND  id_product=${product} `;
  if (ishere.rows.length > 0) {
    const productIn = ishere.rows[0];
    await sql`UPDATE cartbyuser SET quantity=${
      productIn.quantity + 1
    }  WHERE  id_user=${user} AND  id_product=${product} `;
  } else {
    const data =
      await sql`INSERT INTO cartbyuser VALUES(${user},${product},${1}) `;
    console.log(data);
  }

  revalidatePath("/cart");
}

export async function RemoveFromOneCart({ user, product }: CartProps) {
  const ishere =
    await sql`SELECT * FROM productsbyuser  WHERE  id_user=${user} AND  id_product=${product} `;

  if (ishere.rows.length > 0) {
    const productIn = ishere.rows[0];
    const quantity = productIn.quantity;
    if (quantity > 1) {
      await sql`UPDATE productsbyuser SET quantity=${
        quantity - 1
      }  WHERE  id_user=${user} AND  id_product=${product} `;
    } else {
      await sql`DELETE  FROM  productsbyuser WHERE id_user=${user} AND  id_product=${product} `;
    }
  }

  revalidatePath("/cart");
}

export async function RemoveFromCart({ user, product }: CartProps) {
  const deleted =
    await sql`DELETE  FROM  productsbyuser WHERE id_user=${user} AND  id_product=${product} `;

  revalidatePath("/cart");
}

export async function getUserProducts(id: string) {
  const data = await sql`SELECT p.*, ps.quantity 
FROM productsbyuser ps
INNER JOIN products p ON ps.id_product = p.id
WHERE ps.id_user = 0 
ORDER BY p.title;`;

  return data.rows;
}
