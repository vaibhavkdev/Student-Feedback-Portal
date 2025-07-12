import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [submittedCourses, setSubmittedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = parseInt(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCoursesAndFeedback = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [coursesRes, submittedIdsRes] = await Promise.all([
          axios.get("http://localhost:5062/api/courses"),
          axios.get("http://localhost:5062/api/feedback/my", { headers })
        ]);

        const allCourses = coursesRes.data;
        const submittedIds = submittedIdsRes.data.map(id => parseInt(id));

        // Merge with any locally stored submissions (if any)
        const localSubmitted = JSON.parse(
          localStorage.getItem("submittedCourseIds") || "[]"
        ).map(id => parseInt(id));

        const finalSubmitted = Array.from(
          new Set([...submittedIds, ...localSubmitted])
        );

        setCourses(allCourses);
        setSubmittedCourses(finalSubmitted);
        localStorage.removeItem("submittedCourseIds");
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        alert("Something went wrong while loading the dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndFeedback();
  }, [token, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow max-w-4xl p-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-green-700">
          Student Dashboard
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => {
              const courseId = parseInt(course.courseId);
              const isSubmitted = submittedCourses.includes(courseId);

              return (
                <div
                  key={courseId}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.course_Name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {course.description || "No description provided."}
                  </p>

                  {/* Status Badge */}
                  <p className="flex items-center gap-1 mt-2 text-sm">
                    Status:
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isSubmitted
                          ? "text-green-700 bg-green-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {isSubmitted ? "Feedback Submitted!" : "Pending"}
                    </span>
                  </p>

                  {/* Feedback button only if not submitted */}
                  {!isSubmitted && (
                    <Link
                      to={`/feedback/${courseId}`}
                      className="inline-block px-4 py-2 mt-3 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Give Feedback
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="p-4 text-sm text-center text-white bg-green-600">
        © 2025 Feedback System. All rights reserved.
      </footer>
    </div>
  );
}
