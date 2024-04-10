import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountName = searchParams.get('accountName');
  const accountNumber = searchParams.get('accountNumber');
//   const transactionLimit = searchParams.get('transactionLimit');
//   const balanceAmount = searchParams.get('balanceAmount');
 
  try {
    if (!accountName || !accountNumber)
         throw new Error('Account name and account number required');
    await sql`INSERT INTO Accounts (account_name, account_number ) VALUES (${accountName}, ${accountNumber});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const accounts = await sql`SELECT * FROM Accounts;`;
  return NextResponse.json({ accounts }, { status: 200 });
}