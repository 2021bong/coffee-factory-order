import { sql } from '@vercel/postgres';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

type MenuType = {
  string?: [string[], string[]];
};

export async function GET(request: Request) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');

  try {
    const { rows } = await sql`SELECT * FROM CoffeeOrder_orders`;
    console.log('data rows : ', rows); // todo SELECT * FROM이 정상작동하지 않음
    const serverData = rows.length ? rows : null;
    console.log(serverData);
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
