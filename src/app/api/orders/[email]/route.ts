

// import { NextResponse } from "next/server";
// // Opt out of caching for all data requests in the route segment
// export const dynamic = 'force-dynamic'

// export async function GET(request: Request, { params }: { params: { orderId: string }}) {
//   const orderId = params.orderId;
//   console.log("Got this orderId from link: " + orderId)

//   try {

//     return NextResponse.json({ message: "Retrieved order details", orderId});
//   } 
//   catch (error) {
//     return NextResponse.json({ message: "Error retrieving details"});
//   }
// }


import dbConnect from "@/lib/mongodb/dbConnect";
import user from "@/lib/mongodb/models/Users";
import { NextResponse } from "next/server";

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { email: string }}) {
  await dbConnect();

  const email = params.email;
  console.log("Got this email from link: " + email);

  try {
    // Find the user document that contains the order with the given orderId
    const userDocument = await user.findOne({ email });

    if (!userDocument) {
      return NextResponse.json({ error: "email not found" });
    }

    // Find the order object within the user's orders array
    const orders = userDocument.orders;


    if (!orders) {
      return NextResponse.json({ error: "Orders not found" });
    }
    console.log(orders)
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error retrieving order details:", error);
    return NextResponse.json({ error: "Error retrieving order details" });
  }
}