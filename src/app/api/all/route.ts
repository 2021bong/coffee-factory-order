import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

type MenuType = {
  string?: [string[], string[]];
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { rows } = await sql`SELECT * FROM CoffeeOrder_orders`;
    const serverData = rows.length ? rows : null;
    const data: MenuType = {};
    serverData?.forEach((order) => {
      const { name, beverage_name, type } = order;
      if (!data[beverage_name as keyof MenuType]) {
        data[beverage_name as keyof MenuType] = [[], []];
      }
      type
        ? data[beverage_name as keyof MenuType]?.[1].push(name)
        : data[beverage_name as keyof MenuType]?.[0].push(name);
    });
    console.log('/all GET 주문내역', serverData?.length, '개');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
