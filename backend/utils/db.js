import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
    try {
        // Fallback to Google DNS if local DNS configuration is loopback or empty (common Windows issue)
        const servers = dns.getServers();
        if (servers.includes("127.0.0.1") || servers.length === 0) {
            dns.setServers(["8.8.8.8", "8.8.4.4"]);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch(error) {
        console.log(error);
    }
}
export default connectDB;