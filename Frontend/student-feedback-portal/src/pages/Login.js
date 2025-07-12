import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import Navbar from '../components/Navbar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Pass email and password as separate arguments
      const data = await loginUser(form.email, form.password);
      
      // Store token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);

      // Navigate to dashboard based on role
      if (data.role === 'Student') {
        navigate('/student-dashboard');
      } else if (data.role === 'Faculty') {
        navigate('/faculty-dashboard');
      } else if (data.role === 'Admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard'); 
      }
    } catch (error) {
      setErrorMsg(
        error.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md p-6 mx-auto mt-10 bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              autoFocus
              type="email"
              required
              className="w-full p-2 border rounded"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full p-2 pr-10 border rounded"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
              <span
                className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
