import { CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';

/**
 * StatusBadge Component
 * Displays status with icon and styled background
 * @param {string} status - Status value (Draft, Submitted, Accepted, Under Review)
 */
const StatusBadge = ({ status }) => {
  const styles = {
    'Draft': 'bg-slate-100 text-slate-600',
    'Submitted': 'bg-blue-100 text-blue-700',
    'Accepted': 'bg-green-100 text-green-700',
    'Under Review': 'bg-yellow-100 text-yellow-700',
  };

  const icons = {
    'Draft': FileText,
    'Submitted': CheckCircle,
    'Accepted': CheckCircle,
    'Under Review': Clock,
  };

  const Icon = icons[status] || AlertCircle;
  const styleClass = styles[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styleClass}`}>
      <Icon size={14} />
      {status}
    </span>
  );
};

export default StatusBadge;
