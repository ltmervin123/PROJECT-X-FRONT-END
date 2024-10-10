import React, {useRef} from "react";
import axios from "axios";
import img1 from "../assets/1.png";

const UploadResume = () => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    try {
      if (!file) throw new Error("No file selected.");

      if (validateFile(file)) {
        await uploadFileToBackend(file);
        alert("File uploaded successfully!"); // Success message
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert(error.message); // Show error message in an alert
    }
  };

  // Validate file type and size
  const validateFile = (file) => {
    const allowedExtensions = /(\.doc|\.docx|\.pdf)$/i;
    const maxSize = 10 * 1024 * 1024; // 10MB limit

    if (!allowedExtensions.test(file.name)) {
      throw new Error(
        "Invalid file type. Please select a .doc, .docx, or .pdf file."
      );
    }

    if (file.size > maxSize) {
      throw new Error("File size exceeds 10MB. Please choose a smaller file.");
    }

    console.log("File validation passed:", file.name);
    return true;
  };

  // Upload file to the backend
  const uploadFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading file to the backend...");

      const response = await axios.post(
        "http://localhost:5000/api/uploadResume",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      throw new Error("Error occurred while uploading file: " + error);
    }
  };
  return (
    <div className="option-card">
      <img src={img1} alt="Upload Resume" className="option-image" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        laudantium cumque nulla
      </p>
      <button id="uploadResume" onClick={handleUploadClick}>
        Upload Resume
      </button>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".doc,.docx,.pdf"
        onChange={handleFileSelection}
      />
    </div>
  );
};

export default UploadResume;
