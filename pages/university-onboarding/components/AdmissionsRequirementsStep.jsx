import React from 'react';
import { DOCUMENT_OPTIONS } from '../utils/constants';

const AdmissionsRequirementsStep = ({ formData, handleInputChange, handleDocumentToggle }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Admissions & Requirements</h2>
      <p className="step-subtitle">Define your entrance criteria</p>

      <div className="form-row">
        <div className="form-group">
          <label>Acceptance Rate (%) *</label>
          <input
            type="number"
            name="acceptanceRate"
            value={formData.acceptanceRate}
            onChange={handleInputChange}
            placeholder="e.g., 15"
            min="0"
            max="100"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Min. IELTS Score</label>
          <input
            type="text"
            name="ieltsMinScore"
            value={formData.ieltsMinScore}
            onChange={handleInputChange}
            placeholder="e.g., 6.5"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min. TOEFL Score</label>
          <input
            type="text"
            name="toeflMinScore"
            value={formData.toeflMinScore}
            onChange={handleInputChange}
            placeholder="e.g., 90"
            className="form-input"
          />
        </div>
      </div>

      <div className="checkbox-group">
        <h3 className="text-lg font-semibold mb-4">Entrance Exams Required</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="gmatRequired"
            checked={formData.gmatRequired}
            onChange={handleInputChange}
          />
          <span>GMAT Required</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="greRequired"
            checked={formData.greRequired}
            onChange={handleInputChange}
          />
          <span>GRE Required</span>
        </label>
      </div>

      <div className="documents-section mt-8">
        <h3 className="text-lg font-semibold mb-4">Required Documents *</h3>
        <div className="documents-grid">
          {DOCUMENT_OPTIONS.map((doc) => (
            <label key={doc} className="document-checkbox">
              <input
                type="checkbox"
                checked={formData.requiredDocuments.includes(doc)}
                onChange={() => handleDocumentToggle(doc)}
              />
              <span className="document-label">{doc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionsRequirementsStep;
