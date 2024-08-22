import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToPostPage = () => {
        navigate('/post');
    }

    return (
        <>
            <button onClick={() => navigateToPostPage()}>Create a Post</button>
        </>
    )
}

export default HomePage