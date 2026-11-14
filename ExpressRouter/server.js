const express = require("express");
const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");

app.use("/users", users);
app.use("/posts", posts);

let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})