import { useState } from "react";

const usePreviewImg = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
        else {
            console.log("error in reading file");
            setSelectedImage(null);
        }
    };

    return { selectedImage, handleImageChange, selectedFile};
}

export default usePreviewImg;