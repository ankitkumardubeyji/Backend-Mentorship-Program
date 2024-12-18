import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Check if the file path is valid
        if (!localFilePath) {
            console.error("No file path provided");
            return null; // null means empty value that is no value received 
        }

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Auto detects the type of file (image, video, etc.)
        });

        // Log the success and remove the file from local storage
        console.log("File uploaded to Cloudinary:", response.url);


        fs.unlinkSync(localFilePath); // Remove the file after upload

        // Return the response from Cloudinary
        return response;

    } catch (err) {
        // Log the error and remove the file from local storage in case of failure
        console.error("Error uploading file to Cloudinary:", err);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Ensure the file is deleted even on failure
        }

        // Optionally return an error object or throw the error
        return { success: false, message: "File upload failed", error: err };
    }
};

export { uploadOnCloudinary }; // Correct export

