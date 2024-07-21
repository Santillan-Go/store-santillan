import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  const { name, password } = await request.json();

  try {
    const { rows } = await sql`SELECT * FROM users WHERE name=${name}`;

    if (rows.length < 1) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(password, rows[0].password);

    if (!match) {
      return NextResponse.json(
        { message: "Wrong password", error: true },
        { status: 404 }
      );
    }
    // verify password

    return NextResponse.json(rows[0]);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
