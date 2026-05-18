const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Listing = require("../models/listing");
const User = require("../models/user");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    try {
        const adminUser = await User.findOne({ username: "admin" });
        if (!adminUser) {
            console.log("Admin user not found. Please create it first.");
            return;
        }

        const result = await Listing.updateMany({}, { owner: adminUser._id });
        console.log(`${result.modifiedCount} listings updated to owner: admin`);

    } catch (err) {
        console.error("Error updating listings:", err);
    } finally {
        mongoose.disconnect();
    }
}

main();
