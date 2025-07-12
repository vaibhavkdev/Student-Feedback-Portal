import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function FeedbackForm() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    rating: 5,
    comments: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5062/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        alert("Failed to load courses.");
      }
    };
    fetchCourses();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const submitFeedback = async () => {
    if (!form.courseId) {
      alert("Please select a course.");
      return;
    }

    if (form.rating < 1 || form.rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    const payload = {
      courseId: parseInt(form.courseId),
      rating: form.rating,
      comments: form.comments.trim() || null,
    };

    try {
      // Post feedback
      await axios.post("http://localhost:5062/api/feedback", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update localStorage
      const submitted = JSON.parse(localStorage.getItem("submittedCourseIds") || "[]")
        .map((id) => parseInt(id)); // force to number
      const updated = Array.from(new Set([...submitted, payload.courseId]));

      localStorage.setItem("submittedCourseIds", JSON.stringify(updated));

      alert("Feedback submitted successfully!");
      navigate("/student-dashboard"); 
    } catch (err) {
      console.error(" Feedback submission error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0] ||
        "Something went wrong!";
      alert("Submission failed: " + message);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white shadow-md rounded-xl sm:p-8 md:p-10">
      <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">
        Submit Feedback
      </h2>

      {/* Course Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Course</label>
        <select
          name="courseId"
          className="w-full p-2 text-gray-800 border rounded"
          value={form.courseId}
          onChange={handleChange}
        >
          <option value="">-- Select a course --</option>
          {courses.map((course, index) => (
            <option key={course.courseId ?? index} value={course.courseId}>
              {course.course_Name ?? "Unnamed Course"}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">
          Rating (1-5)
        </label>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          className="w-full p-2 text-gray-800 border rounded"
          value={form.rating}
          onChange={handleChange}
        />
      </div>

      {/* Comments */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Comments</label>
        <textarea
          name="comments"
          className="w-full p-2 text-gray-800 border rounded resize-none"
          rows="4"
          value={form.comments}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={submitFeedback}
        className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
