import React, { useState } from 'react';
import axios from 'axios';

export default function AddCourse({ onCourseAdded }) {
  const [form, setForm] = useState({
    course_Name: '',
    description: '',
    createdBy: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const createdBy = localStorage.getItem('userName') || 'Unknown User';

    const courseData = {
      ...form,
      createdBy, 
    };

    try {
      await axios.post('http://localhost:5062/api/courses', courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setForm({ course_Name: '', description: '' });
      if (onCourseAdded) onCourseAdded(); 
    } catch (err) {
      alert('Error adding course: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white border rounded shadow-md">
      <input
        type="text"
        name="course_Name"
        placeholder="Course Name"
        value={form.course_Name}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Course Description"
        value={form.description}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Add Course
      </button>
    </form>
  );
}
