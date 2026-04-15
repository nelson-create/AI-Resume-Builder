import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Loader } from 'lucide-react';
import API from '../api/axios';

const UserProfile = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    bio: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No authentication token found');
          return;
        }
        
        const response = await API.get('/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data) {
          setFormData({
            name: response.data.name || '',
            email: response.data.email || '',
            company: response.data.company || '',
            role: response.data.role || '',
            bio: response.data.bio || ''
          });
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile');
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }
      
      // Update user profile via API
      await API.put('/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local storage with new user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...userData, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-8 rounded-2xl border border-[#3d4a5c] max-w-md w-full shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#e8ecf1]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-[#cbd5e1] hover:text-[#60a5fa] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/30 text-sm"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-green-500/10 text-green-400 p-3 rounded-lg border border-green-500/30 text-sm"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a202c] border border-[#3d4a5c] text-[#e8ecf1] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a202c] border border-[#3d4a5c] text-[#64748b] cursor-not-allowed opacity-60 outline-none"
            />
            <p className="text-xs text-[#94a3b8] mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a202c] border border-[#3d4a5c] text-[#e8ecf1] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              placeholder="Your company"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">
              Role/Position
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a202c] border border-[#3d4a5c] text-[#e8ecf1] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              placeholder="Your job title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a202c] border border-[#3d4a5c] text-[#e8ecf1] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`flex-1 py-2.5 ${loading ? 'bg-orange-500/60' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/50'} text-white font-semibold rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-60`}
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#3d4a5c] hover:bg-[#4a5568] text-[#cbd5e1] font-semibold rounded-lg transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
