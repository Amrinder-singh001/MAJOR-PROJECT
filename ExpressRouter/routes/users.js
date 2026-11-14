const express = require("express");
const router = express.Router();

// this file is created becuase we have to understand the concepts of express router and how to use it in our application. 

// express router is a way to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

// step by step explanation of the code is as follows:

// first we have create the folder called Routes and inside this folder we have created the file called users.js and posts.js.

// In users.js file we have imported the express module and created a router instance using express.Router() method.

// express.router() method is used to create a new router object. We can use this router object to define our routes.

// routes is basically a way to define the endpoints of our application. It is a way to define the URL patterns and the corresponding actions that should be taken when a request is made to that URL.

// router.get method eka get request ko handle karta hai. ye method do parameters leta hai, pehla parameter URL pattern hota hai aur doosra parameter ek callback function hota hai jo request aur response object ko handle karta hai.

// router ke baki methid bhi same hi hote hai jaise ki router.post, router.put, router.delete etc. ye methods bhi do parameters leta hai, pehla parameter URL pattern hota hai aur doosra parameter ek callback function hota hai jo request aur response object ko handle karta hai.

// Jb hm express.router() method se router object create karte hai toh hm express application ke saare methods ko use kar sakte hai jaise ki app.get, app.post, app.put, app.delete etc. ye methods bhi do parameters leta hai, pehla parameter URL pattern hota hai aur doosra parameter ek callback function hota hai jo request aur response object ko handle karta hai.

// Jb hm express.router() method se router object create karte hai toh hm app.use() method ka use karke is router object ko apne application me mount karte hai. app.use() method do parameters leta hai, pehla parameter URL pattern hota hai aur doosra parameter router object hota hai.

//Jb express.router() method se router object create ho jata hai to hum is router object ko module.exports ke through export kar dete hai taki hum is router object ko dusre files me import kar sake.

// In users.js the code explanation is below:
//  first we have imported the express module and created a router instance using express.Router() method. Then we have defined the routes for users using router.get, router.post, router.delete methods. Finally we have exported the router object using module.exports so that we can use this router object in other main server.js file.

// in users.js file we can use router object name where u store the express.router() method. we can use this router object name to define the routes for users. we can use router.get, router.post, router.delete methods rather thn using app.get....post.....put...etc

// second we can use the router object name where we can use the router object name rather than using a app for any methods. In the main server.js file we have imported the users.js file and used the app.use() method to mount the router object to the /users path. This means that all the routes defined in the users.js file will be prefixed with /users path. For example, if we have defined a route for /users in the users.js file, it will be accessible at /users/users path in the main server.js file.

router.get("/users", (req, res) => {
    res.send("get route for users");
});

// show - users
router.get("/:id", (req, res) => {
    res.send("get route for users id ");
});

// post - user
router.get("/post", (req, res) => {
    res.send("post route for users");
});

// delete - users
router.delete("/:id", (req, res) => {
    res.send("delete route for users");
});

module.exports = router;