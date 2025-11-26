import React from 'react';
import { Lock, Unlock } from 'lucide-react';

const ContactVerificationStep = ({ formData, handleInputChange, user }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Contact & Verification</h2>
      <p className="step-subtitle">Complete your profile and verify</p>

      {user && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-semibold flex items-center gap-2">
            <Unlock size={18} className="text-blue-600" />
            Profile auto-filled from your account
          </p>
          <p className="text-blue-700 text-sm mt-1">Your name and email are locked and linked to your account.</p>
        </div>
      )}

      <div className="form-group">
        <label className="flex items-center gap-2">
          Contact Person Name *
          {user && <Lock size={16} className="text-slate-400" />}
        </label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleInputChange}
          placeholder="e.g., John Admissions Director"
          className={`form-input ${user ? 'bg-slate-100 cursor-not-allowed' : ''}`}
          disabled={!!user}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="flex items-center gap-2">
            Contact Email *
            {user && <Lock size={16} className="text-slate-400" />}
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="admissions@university.edu"
            className={`form-input ${user ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            disabled={!!user}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Phone *</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            placeholder="+1 (555) 000-0000"
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>University Website *</label>
        <input
          type="url"
          name="websiteUrl"
          value={formData.websiteUrl}
          onChange={handleInputChange}
          placeholder="https://www.university.edu"
          className="form-input"
          required
        />
      </div>

      <div className="form-group mt-8">
        <label>Accreditation Certificate / Verification Document *</label>
        <div className="file-upload-box" onClick={() => document.getElementById('verificationDocInput').click()}>
          <input
            id="verificationDocInput"
            type="file"
            name="verificationDocument"
            onChange={handleInputChange}
            className="file-input"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
          {formData.verificationDocument ? (
            <div className="file-uploaded">
              <p className="text-green-700 font-semibold">✓ {formData.verificationDocument.name}</p>
              <p className="text-slate-500 text-sm">({(formData.verificationDocument.size / 1024).toFixed(2)} KB)</p>
            </div>
          ) : (
            <div>
              <p className="text-slate-700 font-semibold">Click to upload or drag and drop</p>
              <p className="text-slate-600 text-sm">PDF, JPG, or PNG (Max 5MB)</p>
            </div>
          )}
        </div>
      </div>

      <div className="alert-box mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900 text-sm">
          ✓ By submitting this form, you agree to UniBridge's Terms of Partnership and acknowledge that all information provided is accurate and complete.
        </p>
      </div>
    </div>
  );
};

export default ContactVerificationStep;
