import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function GET(request: Request) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  try {
    const statusRows = await sql`SELECT * FROM CoffeeOrder_status WHERE time = ${today};`;
    if (!statusRows.rows.length) {
      await sql`INSERT INTO CoffeeOrder_status (time, status) VALUES (${today}, true);`;
      console.log("make today's status");
      const todayStatus = await sql`SELECT * FROM CoffeeOrder_status WHERE time = ${today};`;
      console.log('todayStatus : ', todayStatus.rows);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const status = (await sql`SELECT * FROM CoffeeOrder_status WHERE time = ${today};`).rows[0].status;
  console.log('/status GET res : ', { status });
  return NextResponse.json({ status }, { status: 200 });
}

// status를 항상 false로 set
export async function POST(request: Request) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  try {
    await sql`UPDATE CoffeeOrder_status SET status = false WHERE time = ${today}`;
    console.log('update status to false');
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const status = (await sql`SELECT * FROM CoffeeOrder_status WHERE time = ${today};`).rows[0].status;
  console.log('POST res : ', { status });
  return NextResponse.json({ status }, { status: 200 });
}
