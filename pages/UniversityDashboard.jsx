import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { Navigate } from 'react-router-dom';
import { Users, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const UniversityDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { userRole, loading: profileLoading } = useUserProfile();
  const [applicants] = useState([
    {
      id: 1,
      studentName: 'Aarav Kumar',
      email: 'aarav.kumar@example.com',
      program: 'M.Sc. Computer Science',
      appliedDate: '2025-11-15',
      gpa: 3.8,
      status: 'pending', // pending, accepted, rejected
      score: 85,
    },
    {
      id: 2,
      studentName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      program: 'M.Sc. Data Engineering',
      appliedDate: '2025-11-10',
      gpa: 3.9,
      status: 'pending',
      score: 92,
    },
    {
      id: 3,
      studentName: 'Marco Rossi',
      email: 'marco.rossi@example.com',
      program: 'M.Sc. Computer Science',
      appliedDate: '2025-11-08',
      gpa: 3.6,
      status: 'pending',
      score: 78,
    },
    {
      id: 4,
      studentName: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      program: 'M.Sc. Robotics',
      appliedDate: '2025-11-05',
      gpa: 3.7,
      status: 'pending',
      score: 88,
    },
  ]);

  const [decisions, setDecisions] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(null);

  // Redirect if not logged in or not a university (check auth first, skip profile fetch check during redirect)
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  // Wait for profile role to load before checking access
  if (profileLoading || userRole === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-slate-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || userRole !== 'university') {
    return <Navigate to="/login" replace />;
  }

  const handleDecision = (applicantId, decision) => {
    setDecisions(prev => ({
      ...prev,
      [applicantId]: decision
    }));
  };

  const pendingCount = applicants.filter(a => !decisions[a.id]).length;
  const acceptedCount = Object.values(decisions).filter(d => d === 'accepted').length;
  const rejectedCount = Object.values(decisions).filter(d => d === 'rejected').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            University Portal
          </h1>
          <p className="text-xl text-slate-600">
            Review applications and make admission decisions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Users size={24} />}
            label="Total Applicants"
            value={applicants.length}
            color="blue"
          />
          <StatCard
            icon={<Clock size={24} />}
            label="Pending Review"
            value={pendingCount}
            color="amber"
          />
          <StatCard
            icon={<CheckCircle size={24} />}
            label="Accepted"
            value={acceptedCount}
            color="green"
          />
          <StatCard
            icon={<XCircle size={24} />}
            label="Rejected"
            value={rejectedCount}
            color="red"
          />
        </div>

        {/* Applicants Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">Student Applications</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">GPA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Applied Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Decision</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, idx) => {
                  const decision = decisions[applicant.id];
                  return (
                    <tr
                      key={applicant.id}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{applicant.studentName}</p>
                          <p className="text-sm text-slate-500">{applicant.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {applicant.program}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {applicant.gpa}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-200 rounded-full h-2 max-w-xs">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                              style={{ width: `${applicant.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{applicant.score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {decision ? (
                          <DecisionBadge decision={decision} />
                        ) : (
                          <span className="text-sm text-slate-500">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowDetailModal(applicant)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          {!decision ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDecision(applicant.id, 'accepted')}
                                className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                                title="Accept"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => handleDecision(applicant.id, 'rejected')}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDecision(applicant.id, null)}
                              className="text-sm text-slate-500 hover:text-slate-700"
                            >
                              Undo
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && (
          <ApplicationDetailModal
            applicant={showDetailModal}
            onClose={() => setShowDetailModal(null)}
            onAccept={() => {
              handleDecision(showDetailModal.id, 'accepted');
              setShowDetailModal(null);
            }}
            onReject={() => {
              handleDecision(showDetailModal.id, 'rejected');
              setShowDetailModal(null);
            }}
          />
        )}
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
 * Decision Badge Component
 */
const DecisionBadge = ({ decision }) => {
  if (decision === 'accepted') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100">
        <CheckCircle size={16} className="text-green-700" />
        <span className="text-sm font-semibold text-green-700">Accepted</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100">
      <XCircle size={16} className="text-red-700" />
      <span className="text-sm font-semibold text-red-700">Rejected</span>
    </div>
  );
};

/**
 * Application Detail Modal
 */
const ApplicationDetailModal = ({ applicant, onClose, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white sticky top-0">
          <h2 className="text-2xl font-bold">{applicant.studentName}</h2>
          <p className="text-purple-100">{applicant.program}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <InfoBlock label="Email" value={applicant.email} />
            <InfoBlock label="GPA" value={applicant.gpa} />
            <InfoBlock label="Application Score" value={`${applicant.score}%`} />
            <InfoBlock label="Applied Date" value={new Date(applicant.appliedDate).toLocaleDateString()} />
          </div>

          <div className="mb-8 p-4 bg-slate-50 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Profile Summary</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {applicant.studentName} has applied for the {applicant.program} program with an excellent academic record (GPA: {applicant.gpa}). 
              The application demonstrates strong technical skills and motivation. Recommendation letters from academic advisors are attached.
            </p>
          </div>

          {/* Decision Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onReject}
              className="flex-1 px-6 py-3 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle size={18} />
              Reject
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
