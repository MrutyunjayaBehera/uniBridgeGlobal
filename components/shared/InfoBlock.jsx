/**
 * Reusable Info Block Component for showing key-value pairs
 */
export const InfoBlock = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</p>
    <p className="text-lg font-bold text-slate-900">{value}</p>
  </div>
);

export default InfoBlock;
