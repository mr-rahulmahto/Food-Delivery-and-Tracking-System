import mongoose from "mongoose";

let retryTimer;

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MongoDB connection skipped: MONGODB_URI is not configured.");
        return false;
    }

    try {
        const conn = await mongoose.connect(uri);
        clearTimeout(retryTimer);
        console.log(`DB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB connection failed (${error.name}). Check MONGODB_URI and the Atlas network access list.`);
        clearTimeout(retryTimer);
        retryTimer = setTimeout(() => void connectDB(), 5000);
        retryTimer.unref();
        return false;
    }
}
