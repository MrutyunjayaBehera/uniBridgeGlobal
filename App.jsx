import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import UniversityDashboard from './pages/UniversityDashboard';
import Login from './pages/Login';
import AIChat from './components/AIChat';
import { AuthProvider, useAuth } from './context/AuthContext';
import ConfirmModal from './components/shared/ConfirmModal';
import LoadingModal from './components/shared/LoadingModal';
import { GraduationCap, LayoutGrid, Sparkles, User, Menu, X, LogOut, Building2 } from 'lucide-react';
import Partners from './pages/Partners';
import UniversityOnboarding from './pages/UniversityOnboarding';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, authLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const userRole = user?.user_metadata?.role || 'student';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  
  const studentLinks = [
    { name: 'Home', path: '/', icon: GraduationCap },
    { name: 'Explore', path: '/explore', icon: LayoutGrid },
    { name: 'Dashboard', path: '/dashboard', icon: User },
  ];

  const universityLinks = [
    { name: 'Home', path: '/', icon: Building2 },
    { name: 'Dashboard', path: '/university-dashboard', icon: User },
    { name: 'Onboarding', path: '/university-onboarding', icon: LayoutGrid },
  ];

  const navLinks = userRole === 'university' ? universityLinks : studentLinks;

  return (
    <nav className={`sticky top-0 z-40 transition-colors duration-300 ${isScrolled ? 'bg-white/70 border-b border-slate-200 shadow-sm backdrop-blur-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">UniBridge</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">
                     {user.email ? user.email[0].toUpperCase() : 'U'}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">{user.user_metadata?.full_name || user.email}</span>
                      <span className="text-[10px] text-slate-500">{userRole === 'university' ? 'University' : 'Student'}</span>
                   </div>
                </div>
                <>
                  <button 
                    onClick={() => setConfirmOpen(true)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </button>
                  <ConfirmModal
                    open={confirmOpen}
                    title="Confirm Sign Out"
                    message="Are you sure you want to sign out?"
                    confirmLabel="Sign Out"
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={async () => {
                      setConfirmOpen(false);
                      await signOut();
                    }}
                  />
                </>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full z-50 shadow-lg">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                   isActive(link.path)
                    ? 'bg-blue-50 text-primary'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} />
                  {link.name}
                </div>
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 mt-2">
              {user ? (
                <div className="space-y-3">
                   <div className="flex items-center gap-3 px-3">
                       <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                         {user.email ? user.email[0].toUpperCase() : 'U'}
                       </div>
                       <span className="text-sm font-medium text-slate-700">{user.email}</span>
                   </div>
                   <>
                     <button 
                       onClick={() => { setIsMobileMenuOpen(false); setConfirmOpen(true); }}
                       className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-md"
                     >
                       <LogOut size={20} />
                       Sign Out
                     </button>
                     <ConfirmModal
                       open={confirmOpen}
                       title="Confirm Sign Out"
                       message="Are you sure you want to sign out?"
                       confirmLabel="Sign Out"
                       onCancel={() => setConfirmOpen(false)}
                       onConfirm={async () => {
                         setConfirmOpen(false);
                         await signOut();
                       }}
                     />
                   </>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-slate-900 text-white text-base font-bold rounded-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};


const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user, authLoading } = useAuth();

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Floating Chat Button - Only show if user is logged in for better UX, or keep for all */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform hover:scale-105 z-40 group flex items-center gap-2"
        >
          <Sparkles size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-medium whitespace-nowrap">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Chat Interface */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} UniBridge Global. Connecting ambitions with opportunities.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-slate-400 text-sm">
             <a href="#" className="hover:text-primary">Privacy Policy</a>
             <a href="#" className="hover:text-primary">Terms of Service</a>
             <Link to="/partners" className="hover:text-primary">University Partners</Link>
          </div>
        </div>
      </footer>
      <LoadingModal open={authLoading} message="Signing in / Signing out..." />
    </div>
  );
};

// Main App component
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/university-dashboard" element={<UniversityDashboard />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/university-onboarding" element={<UniversityOnboarding />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
