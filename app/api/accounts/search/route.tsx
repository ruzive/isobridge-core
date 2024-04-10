import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountNumber = searchParams.get('accountNumber');
  try {
    if (!accountNumber)
         throw new Error('Account number required');
    const accnumcount = await sql`SELECT COUNT(*) FROM Accounts WHERE account_number = ${accountNumber};`;
    
  return NextResponse.json({ accnumcount: accnumcount.rows}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  
}