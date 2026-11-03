import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rahulmahto2486_db_user:ZXZJUxrojqUEgohZ@cluster0.uwaptz8.mongodb.net/food-Management-System').then(()=>console.log("DB Connected"));


}
