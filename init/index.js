// whole logic of data.js : that how we can intialize actual data by logicaly.

const mongoose = require("mongoose");
const initdata = require("./data.js")
let Listing = require("../models/listing.js");

//connect to database through mongoose.
main()
  .then(() => {
    console.log("Connected To DB");
  }) 
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
  "mongodb+srv://amxindersingh_db_user:bsjMTpBpp5loIzZK@cluster0.rdlt2k9.mongodb.net/wanderlust?appName=Cluster"
  );
  console.log("Connected Database:", mongoose.connection.name);

  const admin = mongoose.connection.db.admin();
  const dbsList = await admin.listDatabases();

  console.log("All Databases in Atlas Cluster:");
  dbsList.databases.forEach(db => {
    console.log(` - ${db.name}`);
  });
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Data was intialized successfully");
}

initDB();