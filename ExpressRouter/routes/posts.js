const express = require("express");
const router = express.Router();

// Index 
router.post("/posts", (req, res) => {
    res.send("post route for all posts");
});

// show 
router.post("/posts/:id", (req, res) => {
    res.send("post route for post id ");
});

// post 
router.post("/poses", (req, res) => {
    res.send("post route for poses");
});

// delete 
router.delete("/posts/:id", (req, res) => {
    res.send("delete route for posts");
});

module.exports = router;