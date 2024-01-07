import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const allOrderData = await sql`SELECT * FROM Coffeeorder_order`;
    const data = allOrderData.rows.length ? allOrderData.rows : null;
    console.log('/all GET 주문내역', data?.length, '개');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
