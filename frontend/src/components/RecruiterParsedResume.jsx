import React, { useEffect, useState } from "react";
import axios from "axios";

const RecruiterParsedResume = ({ studentId }) => {
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchParsedResume = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/resume/parse/${studentId}`,
        { withCredentials: true }
      );

      if (res.data.success && res.data.data) {
        setParsedData(res.data.data);
      } else {
        setError(res.data.message || "No data found.");
      }
    } catch (err) {
      console.error("Failed to fetch parsed resume", err);
      setError(
        err.response?.data?.message ||
        "Failed to fetch parsed resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) fetchParsedResume();
  }, [studentId]);

  if (loading) return <p className="text-sm text-gray-500">Loading parsed resume...</p>;

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  if (!parsedData) return <p className="text-sm text-gray-500">No parsed data available.</p>;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50 shadow text-sm">
      <h2 className="text-lg font-semibold mb-2">Parsed Resume Info</h2>
      {parsedData.name && <p><strong>Name:</strong> {parsedData.name}</p>}
      {parsedData.email && <p><strong>Email:</strong> {parsedData.email}</p>}
      {parsedData.phone && <p><strong>Phone:</strong> {parsedData.phone}</p>}
      {parsedData.linkedin && <p><strong>LinkedIn:</strong> {parsedData.linkedin}</p>}
      {parsedData.github && <p><strong>GitHub:</strong> {parsedData.github}</p>}
      {parsedData.skills?.length > 0 && (
        <p><strong>Skills:</strong> {parsedData.skills.join(", ")}</p>
      )}
    </div>
  );
};

export default RecruiterParsedResume;
