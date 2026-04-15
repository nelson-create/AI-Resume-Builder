import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import API from '../api/axios';
import AnimatedBackground3D from '../components/AnimatedBackground3D';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await API.post('/auth/login', { email, password });
      
      // Verify response has required data
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid authentication response');
      }
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Small delay to ensure localStorage is written before navigation
      setTimeout(() => {
        navigate('/builder');
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center py-20 px-6 min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] overflow-hidden">
      <AnimatedBackground3D />
      
      {/* Content container with higher z-index */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-8 md:p-10 rounded-2xl shadow-2xl shadow-orange-500/50 border border-orange-500 max-w-md w-full backdrop-blur-sm bg-opacity-95"
      >
         <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl mb-4 border border-orange-500/60"
            >
              <LogIn className="text-orange-400" size={28} />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#e8ecf1] mb-2">Welcome Back</h2>
            <p className="text-[#cbd5e1]">Sign in to continue building your resume.</p>
         </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/30 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
             <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">Email Address</label>
             <div className="relative">
               <Mail className="absolute left-3 top-3.5 text-[#64748b]" size={20} />
               <input 
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-[#1a202c] border border-orange-500/30 text-[#e8ecf1] placeholder-[#64748b] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                 placeholder="you@example.com"
                 required 
               />
             </div>
           </div>
          
           <div>
             <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">Password</label>
             <div className="relative">
               <Lock className="absolute left-3 top-3.5 text-[#64748b]" size={20} />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-[#1a202c] border border-orange-600/30 text-[#e8ecf1] placeholder-[#64748b] focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 outline-none transition-all"
                 placeholder="••••••••"
                 required 
               />
             </div>
           </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${loading ? 'bg-orange-500/60' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/70'} text-black font-bold rounded-lg transition-all flex justify-center items-center gap-2`}
            >
             {loading ? (
               <>
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                 Signing in...
               </>
             ) : (
               <>
                 <LogIn size={20} />
                 Sign In with Email
               </>
             )}
           </motion.button>
        </form>

          <div className="mt-6 text-center">
            <p className="text-[#cbd5e1]">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Create one
              </Link>
            </p>
          </div>
      </motion.div>
    </div>
  );
};

export default Login;