import { useState, useRef } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const PostPage = () => {
    const [title, setTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, selectedImage} = usePreviewImg();
    const navigate = useNavigate();

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title)
            formData.append("postBody", postBody)
            formData.append("image", selectedFile)
            await axios.post("http://localhost:5000/posts", formData, {headers: {"Content-Type": "multipart/form-data"}});

        } catch (error) {
            console.log(error);
        }

        navigate('/');
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
            <img src={selectedImage} style={{ maxWidth: '30%' }} />

            <button>Post</button>
        </form>
        
        </>
    )
}

export default PostPage