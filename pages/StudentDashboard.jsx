import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, GraduationCap, BookOpen, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [applications] = useState([
    {
      id: 1,
      universityName: 'Tech University of Munich',
      program: 'M.Sc. Computer Science',
      status: 'pending', // pending, accepted, rejected
      appliedDate: '2025-11-15',
      deadline: '2025-12-31',
      lastUpdate: '2025-11-22'
    },
    {
      id: 2,
      universityName: 'ETH Zurich',
      program: 'M.Sc. Cyber Security',
      status: 'accepted',
      appliedDate: '2025-11-10',
      deadline: '2025-12-15',
      lastUpdate: '2025-11-25'
    },
    {
      id: 3,
      universityName: 'University of Toronto',
      program: 'M.Sc. Applied Computing',
      status: 'rejected',
      appliedDate: '2025-11-05',
      deadline: '2025-12-20',
      lastUpdate: '2025-11-20'
    },
    {
      id: 4,
      universityName: 'Royal Institute of Stockholm',
      program: 'M.Sc. Machine Learning',
      status: 'pending',
      appliedDate: '2025-11-18',
      deadline: '2026-01-15',
      lastUpdate: '2025-11-22'
    }
  ]);

  // Redirect if not logged in or not a student
  if (!loading && (!user || user.user_metadata?.role === 'university')) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  const stats = {
    total: applications.length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    pending: applications.filter(a => a.status === 'pending').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Welcome, {user?.user_metadata?.full_name || user?.email}
          </h1>
          <p className="text-xl text-slate-600">
            Manage your university applications and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<GraduationCap size={24} />}
            label="Total Applications"
            value={stats.total}
            color="blue"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            label="Accepted"
            value={stats.accepted}
            color="green"
          />
          <StatCard
            icon={<Clock size={24} />}
            label="Pending Review"
            value={stats.pending}
            color="amber"
          />
          <StatCard
            icon={<XCircle size={24} />}
            label="Rejected"
            value={stats.rejected}
            color="red"
          />
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">Your Applications</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">University & Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Applied Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Last Update</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr
                    key={app.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{app.universityName}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                          <BookOpen size={14} />
                          {app.program}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {new Date(app.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(app.lastUpdate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <Zap size={32} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Explore More Universities</h3>
            <p className="text-blue-100 mb-4">Discover and apply to more universities that match your profile.</p>
            <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Browse Universities
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
            <Zap size={32} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Get AI Assistance</h3>
            <p className="text-purple-100 mb-4">Get personalized guidance from our AI counselor for your applications.</p>
            <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
              Ask AI Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Stat Card Component
 */
const StatCard = ({ icon, label, value, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  return (
    <div className={`rounded-xl p-6 border ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-3xl opacity-20">{icon}</div>
      </div>
    </div>
  );
};

/**
 * Status Badge Component
 */
const StatusBadge = ({ status }) => {
  const statusMap = {
    accepted: { label: 'Accepted', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' },
    pending: { label: 'Pending', icon: Clock, bg: 'bg-amber-100', text: 'text-amber-700' },
    rejected: { label: 'Rejected', icon: XCircle, bg: 'bg-red-100', text: 'text-red-700' },
  };

  const config = statusMap[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}>
      <Icon size={16} className={config.text} />
      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
};

export default Dashboard;
