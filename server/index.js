const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/posts", async (req, res) => {
    try {
        const { title, postBody, imageName } = req.body;
        const newPost = await pool.query(
            "INSERT INTO posts (post_title, post_body, image_name) VALUES ($1, $2, $3) RETURNING *",
            [title, postBody, imageName]
        );

        res.json(newPost.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
});

app.get("/posts", async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");
        res.json(allPosts.rows)
    } 
    catch (error) {
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});