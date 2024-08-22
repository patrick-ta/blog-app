import express from "express";
import cors from "cors";
import multer from "multer";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});



app.post("/posts", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    // try {
    //     const { title, postBody, imageName } = req.body;
    //     const newPost = await pool.query(
    //         "INSERT INTO posts (post_title, post_body, image_name) VALUES ($1, $2, $3) RETURNING *",
    //         [title, postBody, imageName]
    //     );

    //     res.json(newPost.rows[0]);
    // }
    // catch (error) {
    //     console.log(error);
    // }
    res.send();
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