import { useState, useRef } from "react";
import usePreviewImg from "../hooks/usePreviewImg";

const PostPage = () => {
    const [title, setTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile} = usePreviewImg();

    console.log(selectedFile);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const imageName = "test.png"
            const body = { title, postBody, imageName };
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <form onSubmit={onSubmitForm}>
            <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            />

            <textarea 
            name="" 
            id="" 
            rows="15" 
            cols="100"
            value={postBody}
            onChange={e => setPostBody(e.target.value)}
            />

            <input type="file" accept="image/*" ref={imageRef} onChange={handleImageChange}/>
            <img src={selectedFile} style={{ maxWidth: '30%' }} />

            <button>Post</button>
        </form>
        
        </>
    )
}

export default PostPage