import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const navigateToPostPage = () => {
        navigate('/post');
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts'); 
                const result = await response.json();
                setPosts(result); 
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <button onClick={() => navigateToPostPage()}>Create a Post</button>

            <div>
                {posts.map((post) => (
                    <div key={post.post_id}>
                        <h2>{post.post_title}</h2>
                        <p>{post.post_body}</p>
                        <img src={post.imageUrl}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default HomePage