import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // append image file to form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_PFP, formData, {
            headers: {
                "Content-Type": "multipart/form-data", //set header for file upload
            },
        });
        return response.data; // return the response data 
    }catch (error) {
        console.error("Error uploading image:", error);
        throw error; // rethrow the error to be handled by caller
    }
}

export default uploadImage;