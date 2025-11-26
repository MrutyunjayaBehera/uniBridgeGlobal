import React from 'react';
import { TUITION_RANGES } from '../utils/constants';

const TuitionScholarshipsStep = ({ formData, handleInputChange }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Tuition & Scholarships</h2>
      <p className="step-subtitle">Share financial information</p>

      <div className="form-group">
        <label>Annual Tuition Range *</label>
        <select
          name="tuitionRange"
          value={formData.tuitionRange}
          onChange={handleInputChange}
          className="form-input"
          required
        >
          <option value="">Select Range</option>
          {TUITION_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="checkbox-group mt-6">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="scholarshipsAvailable"
            checked={formData.scholarshipsAvailable}
            onChange={handleInputChange}
          />
          <span>Scholarships Available</span>
        </label>

        {formData.scholarshipsAvailable && (
          <div className="form-group mt-4">
            <label>Avg. Scholarship Amount (USD) *</label>
            <input
              type="text"
              name="scholarshipAmount"
              value={formData.scholarshipAmount}
              onChange={handleInputChange}
              placeholder="e.g., $5,000 - $15,000"
              className="form-input"
            />
          </div>
        )}

        <label className="checkbox-label mt-4">
          <input
            type="checkbox"
            name="paymentPlans"
            checked={formData.paymentPlans}
            onChange={handleInputChange}
          />
          <span>Flexible Payment Plans Available</span>
        </label>
      </div>
    </div>
  );
};

export default TuitionScholarshipsStep;
