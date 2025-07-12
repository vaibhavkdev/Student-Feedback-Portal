import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function FacultyDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized. Please login.");
          return;
        }

        const response = await axios.get("http://localhost:5062/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching faculty feedbacks:", error);
        alert("Failed to load faculty feedback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyFeedback();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-purple-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow max-w-5xl p-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-purple-700">
          Faculty Dashboard
        </h1>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border border-collapse border-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Comments</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {fb.course?.course_Name || "Unknown"}
                    </td>
                    <td className="px-4 py-2 border">
                      {fb.user?.name || "Unknown Student"}
                    </td>
                    <td className="px-4 py-2 text-center border">{fb.rating}</td>
                    <td className="px-4 py-2 border">
                      {fb.comments || "No comments"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-gray-500 border"
                  >
                    No feedback data available for your courses.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="p-4 text-sm text-center text-white bg-purple-600">
        © 2025 Feedback System. All rights reserved.
      </footer>
    </div>
  );
}
