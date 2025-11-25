import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, ShieldCheck, GraduationCap } from 'lucide-react';
import AnimatedCounter from '../components/shared/AnimatedCounter';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        
        {/* Floating decorative elements */}
        <div className="floating-blob blob-blue animate-float"></div>
        <div className="floating-blob blob-purple animate-float-slow"></div>
        <div className="floating-blob blob-pink animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-blue-200 text-sm font-semibold mb-6 border border-white/20 backdrop-blur-sm animate-fade-in-up">
            Bridging Talent & Global Education
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up">
            Launch Your Global <br className="hidden md:block" /> 
            Academic Journey
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Connect directly with world-class universities. Transparent applications, AI-powered guidance, and a community of scholars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link 
              to="/explore" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 animate-pulse-glow"
            >
              Start Exploring <ArrowRight size={20} />
            </Link>
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center hover:-translate-y-1"
            >
              Track Applications
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        <FeatureCard 
          icon={<Globe size={28} />}
          iconColor="primary"
          borderColor="border-primary"
          title="Global Discovery"
          description="Access a curated database of accredited universities worldwide. Filter by tuition, location, and program specifics."
          animationDelay="0.1s"
        />
        <FeatureCard 
          icon={<ShieldCheck size={28} />}
          iconColor="accent"
          borderColor="border-accent"
          title="Transparent Process"
          description="No hidden fees or middle-men. Direct communication channels with university admission teams and alumni."
          animationDelay="0.2s"
        />
        <FeatureCard 
          icon={<GraduationCap size={28} />}
          iconColor="secondary"
          borderColor="border-secondary"
          title="AI Counselor"
          description="Get 24/7 assistance with your Statement of Purpose, visa requirements, and interview prep using our Gemini-powered AI."
          animationDelay="0.3s"
        />
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        
        <div className="stats-container">
          <StatCard 
            number={<AnimatedCounter target={500} suffix="+" />}
            label="Partner Universities"
            delay="0.1s"
          />
          <StatCard 
            number={<AnimatedCounter target={12000} suffix="+" />}
            label="Successful Applicants"
            delay="0.2s"
          />
          <StatCard 
            number={<AnimatedCounter target={98} suffix="%" />}
            label="Satisfaction Rate"
            delay="0.3s"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-blob-1 animate-float"></div>
        <div className="cta-blob-2 animate-float-slow"></div>
        
        <div className="cta-container">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 animate-fade-in-up">Ready to Shape Your Future?</h2>
          <p className="text-slate-600 mb-8 text-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Join the community of ambitious graduates taking the next step in their academic careers.</p>
          <button className="cta-button animate-fade-in-up animate-pulse-glow" style={{ animationDelay: '0.2s' }}>
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
};

/**
 * FeatureCard Component
 * Reusable card for displaying feature highlights
 */
const FeatureCard = ({ icon, iconColor, borderColor, title, description, animationDelay }) => {
  const iconColorMap = {
    primary: 'feature-icon primary',
    accent: 'feature-icon accent',
    secondary: 'feature-icon secondary',
  };

  return (
    <div 
      className={`feature-card ${borderColor} animate-fade-in-up`}
      style={{ animationDelay }}
    >
      <div className={`${iconColorMap[iconColor]} animate-float`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

/**
 * StatCard Component
 * Displays statistics with animation
 */
const StatCard = ({ number, label, delay }) => {
  return (
    <div 
      className="stat-item animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="stat-number">
        {number}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default Home;
