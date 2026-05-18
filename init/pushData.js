// const mongoose = require("mongoose");
// const initData = require("../init/data.js");
// const Listing = require("../models/listing.js");
// const User = require("../models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//   await mongoose.connect(MONGO_URL);
//   console.log("Connected to DB");

//   let user = await User.findOne({ email: "aakash@gmail.com" });
//   if (!user) {
//     const newUser = new User({ email: "aakash@gmail.com", username: "aakash" });
//     user = await User.register(newUser, "aakash@17");
//     console.log("User created: aakash");
//   } else {
//     console.log("User already exists: aakash");
//   }

//   await Listing.deleteMany({});
//   console.log("Existing listings cleared");

//   const listings = initData.data.map((obj) => ({
//     ...obj,
//     owner: user._id,
//     image: Array.isArray(obj.image) ? obj.image : [obj.image]
//   }));

//   await Listing.insertMany(listings);
//   console.log("Data pushed successfully with owner aakash@gmail.com");

//   mongoose.disconnect();
// }

// main().catch((err) => {
//   console.error("Error pushing data:", err);
//   mongoose.disconnect();
// });
