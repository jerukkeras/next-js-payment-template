import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request) {
    const {id, productName, price, quantity} = await request.json();

    let parameter = {
        item_details: {
            price: price,
            quantity: quantity,
            name: productName,
        },
        transaction_details: {
            order_id: id,
            gross_amount: quantity * price
        }
    };

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json ({token})
}