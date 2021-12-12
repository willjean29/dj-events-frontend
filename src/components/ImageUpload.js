import { API_URL } from "config";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "styles/Form.module.css";
function ImageUpload({ eventId, imageUploaded, token }) {
  const [image, setImage] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (response.ok) {
      imageUploaded();
    } else {
      toast.error("Error upload image");
    }
  };
  return (
    <div className={styles.form}>
      {/* <h1>Upload Event Image</h1> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}

export default ImageUpload;
