import express from "express";
import cors from "cors";
import multer from "multer";
import pool from "./db.js";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

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
    const imageName = randomImageName();
    console.log(imageName);
    console.log(req.body);

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    const command = new PutObjectCommand(params);

    await s3.send(command);

    try {
        const { title, postBody } = req.body;
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

        for (const post of allPosts.rows) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: post.image_name,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, {expiresIn: 3600});
            post.imageUrl = url;
        }

        res.json(allPosts.rows)
    } 
    catch (error) {
        console.log(error);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});