import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
// CHECK THIS
export async function POST(request: NextRequest) {
  const dataUser = await request.json();

  try {
    const userFound =
      await sql`SELECT * FROM users  WHERE name=${dataUser.name}`;

    if (userFound.rows[0]) {
      return NextResponse.json(
        {
          message: "Name already exist",
        },
        {
          status: 400,
        }
      );
    }

    const hashpassword = await bcrypt.hash(dataUser.password, 10);
    console.log(hashpassword);
    const id = crypto.randomUUID();
    const result =
      await sql`INSERT INTO users (id,name,password) VALUES(${id},${dataUser.name},${hashpassword})`;

    // const { password: _, ...user } = newUser;
    console.log(result);
    // if (!newUser) {
    //   return NextResponse.json(
    //     { message: "Something went wrong to create the user" },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    return NextResponse.json({ name: dataUser.name, id });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
