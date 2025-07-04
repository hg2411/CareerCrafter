import React, { useEffect, useState } from "react";
import axios from "axios";

const ParsedResume = ({ studentId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParsed = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/resume/parse/${studentId}`,
          { withCredentials: true }
        );
        setData(res.data.data);
      } catch (err) {
        console.error("Parsing failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchParsed();
  }, [studentId]);

  if (loading)
    return <p className="text-sm text-gray-500">Loading parsed resume...</p>;

  if (!data)
    return <p className="text-sm text-red-500">Failed to load parsed resume.</p>;

  return (
    <div className="space-y-2 text-sm">
      <p><strong>Name:</strong> {data.name || "N/A"}</p>
      <p><strong>Email:</strong> {data.email || "N/A"}</p>
      <p><strong>Phone:</strong> {data.phone || "N/A"}</p>
      <p><strong>LinkedIn:</strong> {data.linkedin || "N/A"}</p>
      <p><strong>GitHub:</strong> {data.github || "N/A"}</p>
      <p><strong>Skills:</strong> {data.skills?.length ? data.skills.join(", ") : "N/A"}</p>
    </div>
  );
};

export default ParsedResume;
