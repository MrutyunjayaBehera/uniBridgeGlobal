import React from 'react';

const AcademicProgramsStep = ({ formData, handleProgramChange, addProgram, removeProgram }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Academic Programs</h2>
      <p className="step-subtitle">List your degree programs and specializations</p>

      <div className="programs-list">
        {formData.programs.map((program, idx) => (
          <div key={idx} className="program-card">
            <div className="form-row">
              <div className="form-group">
                <label>Program Name *</label>
                <input
                  type="text"
                  value={program.name}
                  onChange={(e) => handleProgramChange(idx, 'name', e.target.value)}
                  placeholder="e.g., Master of Computer Science"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Degree Type *</label>
                <select
                  value={program.degree}
                  onChange={(e) => handleProgramChange(idx, 'degree', e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Language of Instruction *</label>
                <input
                  type="text"
                  value={program.language}
                  onChange={(e) => handleProgramChange(idx, 'language', e.target.value)}
                  placeholder="e.g., English, German"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration (months) *</label>
                <input
                  type="number"
                  value={program.duration}
                  onChange={(e) => handleProgramChange(idx, 'duration', e.target.value)}
                  placeholder="e.g., 24"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {formData.programs.length > 1 && (
              <button
                type="button"
                onClick={() => removeProgram(idx)}
                className="mt-2 text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Remove Program
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProgram}
        className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
      >
        + Add Another Program
      </button>
    </div>
  );
};

export default AcademicProgramsStep;
