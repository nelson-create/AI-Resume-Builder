import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../api/axios';

const SSOCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleSSOCallback = async () => {
      try {
        // Check for error in URL params (from Google OAuth redirect)
        const errorParam = searchParams.get('error');
        if (errorParam) {
          const errorDescription = searchParams.get('error_description') || 'Authentication failed';
          throw new Error(errorDescription);
        }

        // Get the code from URL params (Google OAuth flow)
        const code = searchParams.get('code');

        if (!code) {
          throw new Error('No authorization code received');
        }

        console.log('Sending authorization code to backend...');

        // Send the code to backend to exchange for tokens
        const response = await API.post('/auth/google', { code });

        console.log('Backend response:', response.data);

        // Verify response has required data
        if (!response.data.token || !response.data.user) {
          throw new Error('Invalid authentication response from server');
        }

        // Store token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        console.log('Token and user data stored, redirecting to builder...');

        // Redirect to builder
        navigate('/builder', { replace: true });
      } catch (err) {
        console.error('SSO Callback Error:', err);
        setError(err.message || 'Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleSSOCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3d4a5c] border-t-[#a78bfa] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#cbd5e1] text-lg font-semibold">Completing sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      <div className="text-center p-8">
        {error ? (
          <>
            <div className="text-red-400 text-xl mb-4">Authentication Failed</div>
            <p className="text-[#cbd5e1] mb-6">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-lg"
            >
              Back to Login
            </button>
          </>
        ) : (
          <p className="text-[#cbd5e1]">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default SSOCallback;
