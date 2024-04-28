import mongoose from 'mongoose'




// If already connected do nothing use the first connection, else connect to the database
async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } 
    catch (error) {
        console.log("connection failed")
    }
}


export default dbConnect;