import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Menu, LogOut, User, Phone, Settings } from 'lucide-react';
import { useState } from 'react';
import UserProfile from './UserProfile';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to login even if something fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
      <nav className="bg-gradient-to-r from-[#0f1419] to-[#1a1f2e] border-b border-orange-500/30 sticky top-0 z-50 px-6 shadow-lg shadow-orange-500/20 print:hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
           <motion.div 
             whileHover={{ scale: 1.1, rotate: 10 }}
              className="text-orange-400 bg-gradient-to-br from-orange-400/20 to-orange-500/20 p-2 rounded-lg"
           >
            <FileText size={28} />
          </motion.div>
          <div>
            <span className="text-2xl font-black text-[#e8ecf1] tracking-tight">
              ResumeAI
            </span>
            <p className="text-xs text-[#94a3b8]">AI-Powered Builder</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center ml-auto">
            <Link to="/" className="text-[#cbd5e1] hover:text-orange-400 font-bold transition-colors duration-300">
              Home
            </Link>
            <Link to="/templates" className="text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors duration-300">
              Templates
            </Link>
            <Link to="/contact" className="text-[#cbd5e1] hover:text-orange-600 font-bold transition-colors duration-300">
              Contact
            </Link>
          
           {token && user ? (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-orange-500/30">
                <div className="flex items-center gap-2 text-[#cbd5e1]">
                  <User size={18} />
                  <span className="font-semibold">{user.name || 'User'}</span>
                </div>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setProfileModalOpen(true)}
                  className="text-[#cbd5e1] hover:text-orange-500 flex items-center gap-1 font-bold transition-colors"
               >
                <Settings size={18} />
                Settings
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-[#cbd5e1] hover:text-red-400 flex items-center gap-1 font-bold transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </motion.button>
            </div>
           ) : (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-orange-400/30">
                <Link to="/login" className="text-[#cbd5e1] hover:text-orange-400 font-bold transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors">
                  Sign Up
                </Link>
                <Link to="/register" className="text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors">
                 Register
               </Link>
              <Link to="/templates">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                   className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/70 transition-all"
                >
                  Create Resume
                </motion.button>
              </Link>
            </div>
          )}
        </div>

         {/* Mobile Menu Button */}
         <motion.button 
           whileTap={{ scale: 0.95 }}
           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-orange-400 hover:text-orange-500 transition-colors"
         >
          <Menu size={28} />
        </motion.button>
      </div>

       {/* Mobile Menu */}
       <motion.div
         initial={false}
         animate={mobileMenuOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
         transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-orange-500/30"
       >
         <div className="py-4 space-y-3">
           <Link 
             to="/" 
              className="block text-[#cbd5e1] hover:text-orange-400 font-bold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/templates"
              className="block text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              to="/contact"
              className="block text-[#cbd5e1] hover:text-orange-600 font-bold transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          
           <div className="pt-3 border-t border-[#3d4a5c] space-y-3">
              {token && user ? (
                <>
                 <button 
                   onClick={() => {
                     setProfileModalOpen(true);
                     setMobileMenuOpen(false);
                   }}
                    className="w-full text-left text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors py-2"
                 >
                   Settings
                 </button>
                 <button 
                   onClick={() => {
                     handleLogout();
                     setMobileMenuOpen(false);
                   }}
                   className="w-full text-left text-[#cbd5e1] hover:text-red-400 font-bold transition-colors py-2"
                 >
                   Sign Out
                 </button>
               </>
             ) : (
               <>
                  <Link
                    to="/login"
                    className="block text-[#cbd5e1] hover:text-orange-400 font-bold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                 <Link 
                   to="/register" 
                    className="block text-[#cbd5e1] hover:text-orange-500 font-bold transition-colors py-2"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                   Register
                 </Link>
                 <Link 
                   to="/templates"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                    <button className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/70 transition-all">
                     Create Resume
                   </button>
                 </Link>
               </>
             )}
           </div>
        </div>
       </motion.div>
      
      {/* User Profile Modal */}
      {profileModalOpen && (
        <UserProfile onClose={() => setProfileModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
