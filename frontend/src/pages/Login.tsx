import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid email or password.');
        }
        throw new Error('Failed to login. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('user_name', data.name);

      // Login successful, navigate to Dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6 inline-block">
          InterviewMirror AI
        </Link>
        <h2 className="mt-2 text-center text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Or{' '}
          <Link to="/register" className="font-bold text-[#FF5A36] hover:text-[#e04829] transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-10 px-8 shadow-xl shadow-gray-200/50 sm:rounded-3xl border border-gray-100">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-5 py-4 border-none bg-[#F5F5F3] rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A36] transition-shadow"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-5 py-4 border-none bg-[#F5F5F3] rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A36] transition-shadow"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#FF5A36] focus:ring-[#FF5A36] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-[#FF5A36] hover:text-[#e04829]">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-[#FF5A36]/30 text-sm font-bold uppercase tracking-wider text-white bg-[#FF5A36] hover:bg-[#e04829] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A36] transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          
        </div>
      </motion.div>
    </div>
  );
}
