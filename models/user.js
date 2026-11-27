const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

//  hmne userSchema mei username and password isliye store nhi kiya kiu ki in dono ko  { passportLocalMongoose } ka { plugin } function kr deta hei autommatically hmare userSchema mei define kr deta hei. jaise ki password mei hashing, salting ye khud se hi kr deta hei hme externally scratch se build krne ki koi zarurat nhi hei.. Additonal info ke liye passport(npm) ki documentation refer kr skte ho 

const userShema = new Schema({
    email : {
        type : String,
        required : true,
    },
})

userShema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userShema);