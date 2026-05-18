const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  const adminData = {
    email: "admin@gmail.com",
    username: "admin",
    role: "admin",
  };

  const adminPassword = "835751511";

  try {
    let adminUser = await User.findOne({ username: "admin" });
    if (!adminUser) {
      const newUser = new User(adminData);
      adminUser = await User.register(newUser, adminPassword);
      console.log("Admin user created successfully!");
      console.log("Username: admin");
      console.log("Password: 835751511");
    } else {
      console.log("Admin user already exists. Updating password...");
      await adminUser.setPassword(adminPassword);
      adminUser.role = "admin";
      await adminUser.save();
      console.log("Admin password and role updated successfully!");
    }
  } catch (err) {
    console.error("Error creating/updating admin user:", err);
  } finally {
    mongoose.disconnect();
  }
}

main();
