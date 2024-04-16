import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const transactionAmount = searchParams.get('transactionAmount');
  try {
    if (!transactionAmount)
         throw new Error('Transaction Amount required');
    // const accnumcount = await sql`SELECT * FROM Accounts WHERE transaction_limit < ${transactionAmount} AND aid=1;`;
    const accnumcount = await sql` SELECT 
    CASE 
        WHEN transaction_limit < ${transactionAmount} THEN 'false'
        ELSE 'true'
    END AS is_transaction_limit_less
FROM 
    Accounts WHERE
 aid=1;`;
    
  return NextResponse.json({ accnumcount: accnumcount.rows}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  
}