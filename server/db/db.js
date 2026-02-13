import mongoose from "mongoose"

export default async function connectToDB() {
    
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const URI=process.env.MONGO_URI
    if(!URI){
        throw new Error("MONGO URI not found")
    }

    try {
        await mongoose.connect(URI, {autoIndex: true})
        console.log("Database connected Successfully")
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1)
    }
}

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
});