// make tables api in first

// import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // try {
  //   const statusResult = await sql`CREATE TABLE CoffeeOrder_status (time DATE, status BOOLEAN);`;
  //   const orderResult =
  //     await sql`CREATE TABLE CoffeeOrder_orders (name VARCHAR(20), beverage_name VARCHAR(20), type BOOLEAN, unsweet BOOLEAN, lightly BOOLEAN);`;
  //   console.log('CoffeeOrder_status', statusResult);
  //   console.log('CoffeeOrder_orders', orderResult);
  //   return NextResponse.json({ message: 'success' }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ message: 'Now cannot make tables' }, { status: 403 });
  // }
}
