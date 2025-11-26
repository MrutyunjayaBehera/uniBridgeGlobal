import React from 'react';
import { CheckCircle } from 'lucide-react';

const SubmissionSuccess = ({ formData, onReset }) => {
  const submittedAt = new Date().toLocaleString();

  return (
    <div className="submission-success-container animate-fade-in-up">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={64} className="text-green-500" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
        <p className="text-lg text-slate-600 mb-8">Your onboarding application has been successfully saved to our database.</p>

        <div className="submission-details">
          <div className="detail-row">
            <span className="detail-label">Institution Name:</span>
            <span className="detail-value">{formData.institutionName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{formData.city}, {formData.country}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Contact Email:</span>
            <span className="detail-value">{formData.contactEmail}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Programs Submitted:</span>
            <span className="detail-value">{formData.programs.length}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Submitted At:</span>
            <span className="detail-value">{submittedAt}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value text-green-600 font-semibold">✓ Saved to Supabase</span>
          </div>
        </div>

        <div className="success-message-box">
          <p className="text-slate-700">
            Your complete application data has been securely stored in our database. Our team will review your submission and contact you at the provided email address within 3-5 business days.
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-8 py-3 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
