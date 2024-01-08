import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const reqres = await request.json();
  const { name, bever, type } = reqres;
  try {
    const { rows } = await sql`SELECT * FROM CoffeeOrder_orders WHERE name = ${name};`;
    const data = rows.length ? rows : null;
    if (data) {
      await sql`UPDATE CoffeeOrder_orders SET beverage_name = ${bever}, type = ${type} WHERE name = ${name};`;
    } else {
      await sql`INSERT INTO CoffeeOrder_orders (Name, Beverage_name, Type, Unsweet, Lightly) VALUES (${name}, ${bever}, ${type}, false, false);`;
    }
    console.log('/order POST {', name, bever, type, '} success');
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
