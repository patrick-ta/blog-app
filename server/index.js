import express from "express";
import cors from "cors";
import multer from "multer";
import pool from "./db.js";
import { S3Client, PutObjectCommand, BucketAccelerateStatus } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey
    }
});

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});



app.post("/posts", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const command = new PutObjectCommand(params);

    await s3.send(command);

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