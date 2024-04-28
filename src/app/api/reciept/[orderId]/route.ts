

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

export async function GET(request: Request, { params }: { params: { orderId: string }}) {
  await dbConnect();

  const orderId = params.orderId;
  console.log("Got this orderId from link: " + orderId);

  try {
    // Find the user document that contains the order with the given orderId
    const userDocument = await user.findOne({ 'orders.orderId': orderId });

    if (!userDocument) {
      return NextResponse.json({ error: "Order not found" });
    }

    // Find the order object within the user's orders array
    const orderObject = userDocument.orders.find(order => order.orderId.toString() === orderId);

    if (!orderObject) {
      return NextResponse.json({ error: "Order not found" });
    }

    // Extract the items and total from the order object
    const { items, total } = orderObject;

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error("Error retrieving order details:", error);
    return NextResponse.json({ error: "Error retrieving order details" });
  }
}