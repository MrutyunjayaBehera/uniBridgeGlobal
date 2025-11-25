import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Building2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { user, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null); // null, 'student', 'university'

  // If already logged in, redirect to appropriate dashboard
  if (!loading && user) {
    const userRole = user.user_metadata?.role || 'student';
    return <Navigate to={userRole === 'university' ? '/university-dashboard' : '/dashboard'} replace />;
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  // Role selection screen
  if (!selectedRole) {
    return <RoleSelectionScreen onSelectRole={setSelectedRole} />;
  }

  // Student or University login/signup
  if (selectedRole === 'student') {
    return <StudentAuthScreen onBack={() => setSelectedRole(null)} />;
  }

  return <UniversityAuthScreen onBack={() => setSelectedRole(null)} />;
};

/**
 * Role Selection Screen
 */
const RoleSelectionScreen = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to UniBridge
          </h1>
          <p className="text-xl text-slate-600">Choose your role to get started</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Student Card */}
          <div
            onClick={() => onSelectRole('student')}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 overflow-hidden hover:border-blue-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Student</h2>
              <p className="text-blue-100">Explore universities and track applications</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Discover top universities worldwide
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Track your applications in real-time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Get AI-powered guidance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Receive acceptance notifications
                </li>
              </ul>
              <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all group-hover:scale-105">
                Continue as Student →
              </button>
            </div>
          </div>

          {/* University Card */}
          <div
            onClick={() => onSelectRole('university')}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 overflow-hidden hover:border-purple-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a University</h2>
              <p className="text-purple-100">Manage partner programs and applicants</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Review student applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Accept or reject candidates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Access detailed student profiles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Manage multiple programs
                </li>
              </ul>
              <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all group-hover:scale-105">
                Continue as University →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>Don't have an account? No problem! Sign up is just one click away.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Student Auth Screen - Google OAuth
 */
const StudentAuthScreen = ({ onBack }) => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Student Portal</h2>
          <p className="text-blue-100 text-sm">Sign in to explore universities and manage applications.</p>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-slate-600 mb-4">
                Sign in or create a new account with Google. We'll securely manage your applications.
              </p>
            </div>

            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl transition-all hover:shadow-md group"
            >
              <GoogleIcon />
              Sign in with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Quick & Secure</span>
              </div>
            </div>

            <p className="text-xs text-center text-slate-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>

            <button
              onClick={onBack}
              className="w-full py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
            >
              ← Back to role selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * University Auth Screen - Email/Password
 */
const UniversityAuthScreen = ({ onBack }) => {
  const { signUpWithEmail, signInWithEmail } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password, 'university');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUpWithEmail(email, password, 'university');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Building2 className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">University Portal</h2>
          <p className="text-purple-100 text-sm">Manage your partner programs and review applicants.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              activeTab === 'signin'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 text-sm font-semibold transition-all ${
              activeTab === 'signup'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Official Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@university.edu"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>

            <p className="text-xs text-center text-slate-400">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2 text-slate-600 font-medium hover:text-slate-900 transition-colors"
            >
              ← Back to role selection
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * Google Icon Component
 */
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default Login;
