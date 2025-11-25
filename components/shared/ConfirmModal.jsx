import React from 'react';

const ConfirmModal = ({ open, title = 'Confirm', message, onConfirm, onCancel, confirmLabel = 'Yes', cancelLabel = 'Cancel' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 mb-4">{message}</p>
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 rounded-md bg-slate-100 text-slate-700">{cancelLabel}</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white">{confirmLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
