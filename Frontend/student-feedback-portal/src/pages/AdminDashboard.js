import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, feedbacksRes] = await Promise.all([
          axios.get("http://localhost:5062/api/courses"),
          axios.get("http://localhost:5062/api/feedback"),
        ]);
        setCourses(coursesRes.data);
        setFeedbacks(feedbacksRes.data);
      } catch (error) {
        alert("Failed to load data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const averageRating = (courseId) => {
    const courseFeedbacks = feedbacks.filter((fb) => fb.courseId === courseId);
    if (courseFeedbacks.length === 0) return "-";
    const sum = courseFeedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / courseFeedbacks.length).toFixed(2);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="container flex-grow p-4 mx-auto space-y-8 md:p-8">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">
          Admin Dashboard
        </h1>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="mb-2 text-lg font-semibold">Total Courses</h2>
            <p className="text-4xl font-bold text-blue-600">{courses.length}</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="mb-2 text-lg font-semibold">Total Feedbacks</h2>
            <p className="text-4xl font-bold text-blue-600">{feedbacks.length}</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="mb-2 text-lg font-semibold">Avg Feedback Rating</h2>
            <p className="text-4xl font-bold text-blue-600">
              {feedbacks.length === 0
                ? "-"
                : (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Course Feedback Details */}
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Courses & Feedback Summary
          </h2>
          {courses.length === 0 ? (
            <p className="text-center text-gray-600">No courses available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-collapse border-gray-300 table-auto">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-300">
                      Course Name
                    </th>
                    <th className="px-4 py-2 text-center border border-gray-300">
                      Number of Feedbacks
                    </th>
                    <th className="px-4 py-2 text-center border border-gray-300">
                      Average Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.courseId} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">{course.course_Name}</td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {feedbacks.filter((fb) => fb.courseId === course.courseId).length}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {averageRating(course.courseId)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="p-4 text-sm text-center text-white bg-blue-600">
        © 2025 Feedback System. All rights reserved.
      </footer>
    </div>
  );
}
