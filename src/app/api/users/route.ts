import dbConnect from "@/lib/mongodb/dbConnect";
import user from "@/lib/mongodb/models/Users";
import { NextResponse } from "next/server";

// RETURNS THE JSON OF USERS FROM THE MONGODB DATABASE

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