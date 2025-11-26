import React from 'react';
import { Lock } from 'lucide-react';

const InstitutionDetailsStep = ({ formData, handleInputChange, user, submissionError }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Institution Details</h2>
      <p className="step-subtitle">Help us know your university better</p>

      {!user && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 font-semibold flex items-center gap-2">
            <Lock size={18} />
            You must be logged in to complete this onboarding
          </p>
          <p className="text-amber-700 text-sm mt-1">Please sign in with your university email to proceed.</p>
        </div>
      )}

      {submissionError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {submissionError}
        </div>
      )}

      <div className="form-group">
        <label>University / Institution Name *</label>
        <input
          type="text"
          name="institutionName"
          value={formData.institutionName}
          onChange={handleInputChange}
          placeholder="e.g., Technical University of Munich"
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Country *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="e.g., Germany"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="e.g., Munich"
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Institution Type *</label>
          <select
            name="institutionType"
            value={formData.institutionType}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option>University</option>
            <option>College</option>
            <option>Institute</option>
            <option>Academy</option>
          </select>
        </div>
        <div className="form-group">
          <label>Accreditation Body *</label>
          <input
            type="text"
            name="accreditation"
            value={formData.accreditation}
            onChange={handleInputChange}
            placeholder="e.g., SACSCOC, AACSB"
            className="form-input"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailsStep;
