import React from 'react';

const LoadingModal = ({ open, message = 'Working...' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-lg shadow-xl w-80 p-6 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <div className="text-center">
          <div className="font-semibold text-slate-800">{message}</div>
          <div className="text-sm text-slate-500">Please wait a moment.</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
