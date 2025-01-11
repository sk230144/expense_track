import mongoose from "mongoose";



const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://risabht043:Skt230144@cluster0.gd3s0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`MongoDB Connection: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting db : ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDb