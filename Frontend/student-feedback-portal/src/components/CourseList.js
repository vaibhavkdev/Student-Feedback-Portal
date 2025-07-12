import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ course_Name: '', description: '' });
  const userRole = localStorage.getItem('role');
  const userName = localStorage.getItem('name') || 'Unknown'; 

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5062/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load courses');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5062/api/courses',
        {
          ...form,
          createdBy: userName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setForm({ course_Name: '', description: '' });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert('Failed to add course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5062/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert('Failed to delete course');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-4xl p-4 mx-auto mt-10 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-2xl font-bold text-center">Available Courses</h2>

      {(userRole === 'Admin' || userRole === 'Faculty') && (
        <form onSubmit={handleAddCourse} className="mb-6 space-y-2">
          <input
            type="text"
            name="course_Name"
            value={form.course_Name}
            onChange={handleChange}
            placeholder="Course Name"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      )}

      {courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available.</p>
      ) : (
        <ul className="space-y-3">
          {courses.map((course) => (
            <li key={course.courseId} className="p-4 border rounded hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-blue-700">
                    {course.course_Name}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {course.description || 'No description provided.'}
                  </div>
                </div>
                {(userRole === 'Admin' || userRole === 'Faculty') && (
                  <button
                    onClick={() => handleDeleteCourse(course.courseId)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
