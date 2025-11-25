import { FileText } from 'lucide-react';
import StatusBadge from '../components/shared/StatusBadge';

const MOCK_APPLICATIONS = [
  {
    id: '101',
    universityId: '1',
    universityName: 'Tech University of Munich',
    status: 'Submitted',
    dateApplied: '2023-10-15',
    program: 'M.Sc. Computer Science'
  },
  {
    id: '102',
    universityId: '3',
    universityName: 'University of Toronto',
    status: 'Accepted',
    dateApplied: '2023-09-01',
    program: 'M.Sc. Applied Computing'
  },
  {
    id: '103',
    universityId: '2',
    universityName: 'Royal Institute of Stockholm',
    status: 'Draft',
    dateApplied: '2023-11-02',
    program: 'M.Sc. Machine Learning'
  }
];

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Applications</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">University</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_APPLICATIONS.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{app.universityName}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {app.program}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {app.dateApplied}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-blue-700 text-sm font-medium">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {MOCK_APPLICATIONS.length === 0 && (
          <div className="text-center py-20">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No applications yet. Start exploring universities!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
