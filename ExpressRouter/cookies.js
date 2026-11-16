const express = require("express");
const cookieParser = require("cookie-parser");

// app.use(cookieParser()); is used to parse the cookies attached to the client request object. It populates req.cookies with an object keyed by the cookie names. If you pass a secret string to cookieParser(secret), it will also populate req.signedCookies with the signed cookies.
const app = express();
app.use(cookieParser("secretkey")); // secret key(string bi ho skti hei) for signing cookies

let port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// Express cookies :- Cookies are small pieces of data that are stored on the client-side (in the user's browser) and sent to the server with each request. They are commonly used for session management, user authentication, and storing user preferences. In Express.js, you can use the `cookie-parser` middleware to easily work with cookies.
// cookie example :- Client send a request to the server, and the server responds with a Set-Cookie header that instructs the browser to store a cookie. The browser then includes the cookie in subsequent requests to the server.
// For example

app.get("/setcookie", (req, res) => {
    //Syntax : 
    // res.cookie("name", "value", { options });
    
    res.cookie("Name", "JohnDoe");
    res.cookie("Made-in", "India");
    res.cookie("Greet", "Sat shri akal");
    res.send("Cookie has been set!");
    console.dir(req.cookies);
});

app.get("/greet", (req, res) => {
    let {Name = "anonymous"} = req.cookies;
    res.send(`Greeting from cookie: ${Name}`);
    console.log(req.cookies);
});
//explian : 
// we created a route "/setcookie" that sets a cookie named "username" with the value "JohnDoe". When a client makes a GET request to this route, the server responds with a Set-Cookie header, instructing the browser to store the cookie. The browser will then include this cookie in subsequent requests to the server, allowing the server to identify the user or maintain session information.




// Consept of signed cookies :- Signed cookies are a way to ensure the integrity and authenticity of cookie data. When you sign a cookie, you append a cryptographic signature to the cookie value, which allows the server to verify that the cookie has not been tampered with by the client. This is particularly useful for sensitive information, such as session identifiers or user authentication tokens.
// iska use basically ye ensure karta hai ki cookie data ko client ne modify nahi kiya hai. Agar client ne cookie ko modify kar diya, to server us cookie ko reject kar dega, kyunki signature valid nahi hoga. Isse security badh jati hai, aur aap sensitive information ko securely store kar sakte hain.
// for example, if you have a cookie that stores a user's session ID, signing the cookie ensures that the session ID cannot be altered by the client. If the client tries to change the session ID, the server will detect that the signature is invalid and reject the request, preventing unauthorized access to the user's session.

app.get("/setsignedcookie", (req, res) => {
    res.cookie("Made-in", "India", { signed: true });
    res.cookie("Greet", "Sat shri akal", { signed: true });
    res.send("Signed Cookie has been set!");
    console.log(req.signedCookies);
});

// To vcerify signed cookies, you can access them using req.signedCookies. If the signature is valid, the cookie value will be available in req.signedCookies; otherwise, it will be undefined.
app.get("/verifysignedcookie", (req, res) => {      
    let { "Made-in": madeIn = "unknown" } = req.signedCookies;
    res.send(`Signed Cookie value: ${madeIn}`);
    console.log(req.signedCookies);
});