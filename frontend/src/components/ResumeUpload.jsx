import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Resume uploaded successfully!");
      } else {
        alert("Upload failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error?.response?.data?.message || "Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Upload Your Resume</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded px-2 py-1"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;
