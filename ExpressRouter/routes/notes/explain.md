``` Javascript
Express Router Kya Hota Hai?
Express Router ek tarika hai modular aur mountable route handlers banane ka. Ek Router instance ek complete middleware aur routing system hota hai, isliye ise "mini-app" bhi kaha jata hai. Iska use karke hum apne application ke routes ko alag-alag files mein organize kar sakte hain, jo code ko clean aur maintainable banata hai.

Folder: routes
File: users.js
Express Router Import:

File ke shuru mein express module ko import kiya gaya hai aur express.Router() method ka use karke ek router object banaya gaya hai.
Routes Define Karna:

router.get("/users", ...): Ye route users URL ke liye GET request handle karta hai.
router.get("/:id", ...): Ye route kisi specific user ke ID ke liye GET request handle karta hai.
router.get("/post", ...): Ye route /users/post URL ke liye GET request handle karta hai.
router.delete("/:id", ...): Ye route kisi specific user ke ID ke liye DELETE request handle karta hai.
Export Router:

module.exports = router: Is line ke through router object ko export kiya gaya hai, taaki ise dusri files mein import karke use kiya ja sake.


File: posts.js
Express Router Import:

express module ko import karke router object banaya gaya hai.
Routes Define Karna:

router.post("/posts", ...): Ye route /posts URL ke liye POST request handle karta hai.
router.post("/posts/:id", ...): Ye route kisi specific post ke ID ke liye POST request handle karta hai.
router.post("/poses", ...): Ye route /poses URL ke liye POST request handle karta hai (typo lag raha hai, shayad /posts hona chahiye).
router.delete("/posts/:id", ...): Ye route kisi specific post ke ID ke liye DELETE request handle karta hai.
Export Router:

module.exports = router: Is line ke through router object ko export kiya gaya hai.


File: server.js
Express Import:

express module ko import karke ek app object banaya gaya hai.
Routes Import Karna:

users aur posts routes ko require karke import kiya gaya hai.
Routes Mount Karna:

app.use("/users", users): Is line ke through users router ko users path ke saath mount kiya gaya hai.
app.use("/posts", posts): Is line ke through posts router ko /posts path ke saath mount kiya gaya hai.
Server Start Karna:

app.listen(port, ...): Server ko port 3000 par start kiya gaya hai.


Summary
Express Router ka use karke hum apne routes ko alag-alag files mein organize karte hain.
users.js aur posts.js files mein alag-alag routes define kiye gaye hain.
server.js file mein in routes ko import karke mount kiya gaya hai, jo application ke main entry point ka kaam karta hai.

```