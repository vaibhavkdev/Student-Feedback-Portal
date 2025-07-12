import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import Navbar from '../components/Navbar';
import CourseList from '../components/CourseList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-6 sm:px-6 md:px-12 space-y-10">
        <CourseList />
        <FeedbackForm />
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center text-sm">
        © 2025 Feedback System. All rights reserved.
      </footer>
    </div>
  );
}
