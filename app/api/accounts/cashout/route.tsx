import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cashoutPin = searchParams.get('cashoutPin');
  const cashoutAmount = searchParams.get('cashoutAmount');
  try {
    if (!cashoutPin)
         throw new Error('Cashout PIN required');
//     const accnumcount = await sql` SELECT 
//     CASE 
//         WHEN cashout_pin = ${cashoutPin} THEN 'true'
//         ELSE 'false'
//     END AS is_cashoutPin_correct
// FROM 
//     Accounts WHERE
//  aid=1;`;


 const accnumcount = await sql`SELECT 
    CASE 
        WHEN cashout_pin = ${cashoutPin} AND cashout_amount>= ${cashoutAmount} THEN 'CASHOUT'
		WHEN cashout_pin != ${cashoutPin} AND cashout_amount<= ${cashoutAmount} THEN 'INVALID PIN'
		WHEN cashout_pin = ${cashoutPin} AND cashout_amount < ${cashoutAmount} THEN 'LIMIT EXCEEDED'
    END AS cashout_status
FROM 
    Accounts WHERE
 aid=1`
    
  return NextResponse.json({ accnumcount: accnumcount.rows}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  
}