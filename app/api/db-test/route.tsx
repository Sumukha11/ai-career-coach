import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
  const client = new Client({
    connectionString: process.env.NEXT_PUBLIC_NEON_DB_CONNECTION_STRING,
    ssl: false,   // Disable SSL here
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    await client.end();
    return NextResponse.json({ success: true, time: res.rows[0].now });
  } catch (err) {
    console.error('DB connection failed:', err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
