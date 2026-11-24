const express = require("express");
const session = require("express-session");
const connectFlash = require("connect-flash")
const app = express();
const path = require("path")


// Session :- A session is a way to store information (in variables) to be used across multiple pages. Unlike cookies, the information is not stored on the user's computer. Sessions are commonly used for user authentication, shopping carts, and other scenarios where you need to maintain state between requests. In Express.js, you can use the `express-session` middleware to manage sessions easily.

// Basically session ek server-side storage mechanism hai jo user-specific data ko store karta hai. Jab user ek website visit karta hai, server uske liye ek session create kar sakta hai aur relevant information ko server-side par store kar sakta hai. Server phir ek unique session ID ko user's browser ko bhejta hai, jo cookie mein store hoti hai. Agle requests par, browser session ID ko wapas server ko bhejta hai, jisse server stored session data ko retrieve kar sakta hai aur us user ke liye state maintain kar sakta hai.

// when a user visits a website, the server can create a session for that user and store relevant information on the server-side. The server then sends a unique session ID to the user's browser, which is stored in a cookie. On subsequent requests, the browser sends the session ID back to the server, allowing the server to retrieve the stored session data and maintain state for that user.

// whenever we use sessions method inside the app.use() function then we have to must pass a secret key(string) as an option to the session middleware. This secret key is used to sign the session ID cookie, ensuring that it cannot be tampered with by the client. The secret key should be a long, random string that is kept secure and not shared publicly. It is important to use a strong secret key to enhance the security of your sessions and protect against potential attacks.


// Ab hmne app.use mei hmne secret , resave , saveUninitialized ye 3 options pass kiye hai. Ye 3 options ka kya kaam hai ye niche explain kiya gya hai.
// resave: ye option ye decide karta hai ki agar session data change nahi hua hai to bhi session ko resave karna chahiye ya nahi. Agar aapko session data ko har request par resave karna hai to is option ko true set karein, otherwise false set karein.
// saveUninitialized: ye option ye decide karta hai ki agar session data initialize nahi hua hai to bhi session ko save karna chahiye ya nahi. Agar aapko session data ko har request par save karna hai to is option ko true set karein, otherwise false set karein.

const sessionOptions = {
    secret : "MySuperSecretString",
    resave : false,
    saveUninitialized : true
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session(sessionOptions));
app.use(connectFlash());

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.get("/setsession", (req, res) => {
    req.session.username = "JohnDoe";
    console.log( req.session.username);
    res.send("Session has been set!");
});

// Ab dekhege ki ek session ko jb request bheji jaati hai to wo session ke count ko kiase increment karta hai. Yani ki jb bhi user ek request bhejta hai to session ke andar ek count variable ko increment karna hai. Agar count variable exist nahi karta to usko initialize karna hai aur agar exist karta hai to usko increment karna hai.
app.get("/countsession", (req, res) => {
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send(`You sent ${req.session.count} request to Session`);
    console.log(req.session);
});

// How to Store and Use sessions.
// we can store sessions for
app.get("/register", (req, res) => {
    let{ name = "Anonymous" } = req.query;
    req.session.name = name;
    console.log(req.session);
    if(name === "Anonymous"){
        req.flash("failure", `User not registered`)
    }else{
        req.flash("success", `${name}! has successfully registered👍`)
    }
    res.redirect("/register1")
})

// app.get("/hello", (req, res) => {ee
//     res.send(`Hello, ${req.session.name}`);
//     console.log(req.session);
// })


// Now we understand the concept of connect-flash.
// connect-flash : 

app.get("/register1", (req, res) => {
    // related concept to the connect-flash is : res.locals
    res.locals.successmsg = req.flash("success");
    res.locals.failuremsg = req.flash("failure");
    res.render("page.ejs", {name : req.session.name});
})

// related concept to the connect-flash is : res.locals