



// import dbConnect from "@/lib/mongodb/dbConnect";
// import user from "@/lib/mongodb/models/Users";
// import { NextResponse } from "next/server";
// import { mongoose } from 'mongoose';

// // CREATES A NEW ORDER FOR AN EXISTING USER OR CREATES A NEW USER WITH THE ORDER
// export async function POST(request: Request) {
//   await dbConnect();

//   try {

//     const { name, email, products } = await request.json();

//     console.log(name, email, products)


//     let existingUser = await user.findOne({ email });



//     // User exists, add the new order with a generated orderId

//     if (existingUser) {
//       const newOrderId = new mongoose.Types.ObjectId();
//       existingUser.orders.push({ orderId: newOrderId, products });
//       await existingUser.save();
//       return NextResponse.json({ message: "Order added successfully", orderId: newOrderId });
//     }     
    
//     // User doesn't exist, create a new user with the order
    
//     else {
//       const newOrderId = new mongoose.Types.ObjectId();
//       const newUser = new user({
//         name,
//         email,
//         orders: [{ orderId: newOrderId, products }],
//       });

//       await newUser.save();
//       return NextResponse.json({ message: "User created with order", orderId: newOrderId });
//     }
//   } 
//   catch (error) {
//     console.error(error); 
//     if (error.code === 11000) {
//       return NextResponse.json({ error: "Email already exists" });
//     }
//     return NextResponse.json({ error: "Error creating order" });
//   }
// }







import dbConnect from "@/lib/mongodb/dbConnect";
import user from "@/lib/mongodb/models/Users";
import { NextResponse } from "next/server";
import { mongoose } from 'mongoose';

// CREATES A NEW ORDER FOR AN EXISTING USER OR CREATES A NEW USER WITH THE NEW ORDER
export async function POST(request: Request) {
  await dbConnect();

  try {
    
    const { name, email, items, total } = await request.json();

    console.log(name, email, items, total)



    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided for the order." });
    }


    let existingUser = await user.findOne({ email });

    

    const orderId = new mongoose.Types.ObjectId();
    const newOrder = { orderId, items, total };



    // User exists, add the new order
    if (existingUser) {
      existingUser.orders.push(newOrder);
      await existingUser.save();
      return NextResponse.json({ message: "Order added successfully", orderId });
    } 
    
    
    // User doesn't exist, create a new user with the order
    else {
      const newUser = new user({
        name,
        email,
        orders: [newOrder]
      });

      await newUser.save();
      return NextResponse.json({ message: "User created with order", orderId});
    }



  } 
  catch (error) {
    return NextResponse.json({ error: "Error creating order" });
  }
}
