import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const reqres = await request.json();
  const { name, bever, type } = reqres;
  try {
    const orderData = await sql`SELECT * FROM Coffeeorder_order WHERE name = ${name}`;
    const data = orderData.rows.length ? orderData.rows : null;
    if (data) {
      await sql`UPDATE Coffeeorder_order SET beverage_name = ${bever}, type = ${type} WHERE name = ${name}`;
    } else {
      const test = await sql`SELECT * FROM Coffeeorder_order WHERE name = ${name}`;
      await sql`INSERT INTO Coffeeorder_order (Name, Beverage_name, Type, Unsweet, Lightly) VALUES (${name}, ${bever}, ${type}, false, false);`;
    }
    console.log('/order POST {', name, bever, type, '} success');
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
