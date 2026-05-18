const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) =>
  ({
    ...obj,
    owner: "695d39d954e857a58471d64f",
    image: Array.isArray(obj.image) ? obj.image : [obj.image]
  })
  );
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();