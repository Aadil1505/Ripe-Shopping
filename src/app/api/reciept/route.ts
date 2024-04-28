




import dbConnect from "@/lib/mongodb/dbConnect";
import user from "@/lib/mongodb/models/Users";
import { NextResponse } from "next/server";

// GET METHOD TO RETRIEVE ORDER DETAILS FOR CURRENT USER


export  async function GET(request: Request) {
    await dbConnect();

    try {
        const users = await user.find({});

        return NextResponse.json(users)
    } 
    catch (error) {
        return NextResponse.json(error)
    }




    
}