// 4. Important difference
// Method	Work
// Listing.find({})	Listings ka data
// Review.find({})	Reviews ka data
// listCollections()	Saare collection names
// collection().find({})	Kisi bhi collection ka data




const Review = require("./models/reviews.js");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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
  const showCollections = async () => {
    let collections = await mongoose.connection.db.listCollections().toArray();

    collections.forEach((col) => {
        console.log(col.name);
    });
};

showCollections();
}

const findListing = async() => {
  let res = await Review.find({rating : 5});
  console.log(res);
}
findListing();

const find = async() => {
    let res = await Review.find({});
    console.log(res);
  }
//   find();