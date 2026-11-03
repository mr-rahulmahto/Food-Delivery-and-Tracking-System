import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb+srv://rahulmahto2486_db_user:ZXZJUxrojqUEgohZ@cluster0.uwaptz8.mongodb.net/food-Management-System';
        const conn = await mongoose.connect(uri);
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
