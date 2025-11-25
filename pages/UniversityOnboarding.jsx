import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Lock, Unlock, Building2, BookOpen, FileText, DollarSign, Phone } from 'lucide-react';
import '../styles/UniversityOnboarding.css';

const UniversityOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Institution Details
    institutionName: '',
    country: '',
    city: '',
    institutionType: 'University',
    accreditation: '',
    
    // Step 2: Academic Programs
    programs: [{ name: '', degree: '', language: '', duration: '' }],
    
    // Step 3: Admissions & Requirements
    acceptanceRate: '',
    gmatRequired: false,
    greRequired: false,
    ieltsMinScore: '',
    toeflMinScore: '',
    requiredDocuments: [],
    
    // Step 4: Tuition & Scholarships
    tuitionRange: '',
    scholarshipsAvailable: false,
    scholarshipAmount: '',
    paymentPlans: false,
    
    // Step 5: Contact & Verification
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    verificationDocument: null,
  });

  const steps = [
    {
      id: 0,
      title: 'Institution Details',
      description: 'Tell us about your university',
      icon: Building2,
    },
    {
      id: 1,
      title: 'Academic Programs',
      description: 'List your degree programs',
      icon: BookOpen,
    },
    {
      id: 2,
      title: 'Admissions Requirements',
      description: 'Entrance criteria & documents',
      icon: FileText,
    },
    {
      id: 3,
      title: 'Tuition & Scholarships',
      description: 'Costs and financial aid',
      icon: DollarSign,
    },
    {
      id: 4,
      title: 'Contact & Verification',
      description: 'Finalize your profile',
      icon: Phone,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files?.[0] || null : type === 'checkbox' ? checked : value,
    }));
  };

  const handleProgramChange = (index, field, value) => {
    const newPrograms = [...formData.programs];
    newPrograms[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      programs: newPrograms,
    }));
  };

  const addProgram = () => {
    setFormData((prev) => ({
      ...prev,
      programs: [...prev.programs, { name: '', degree: '', language: '', duration: '' }],
    }));
  };

  const removeProgram = (index) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }));
  };

  const handleDocumentToggle = (doc) => {
    setFormData((prev) => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.includes(doc)
        ? prev.requiredDocuments.filter((d) => d !== doc)
        : [...prev.requiredDocuments, doc],
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for localStorage (convert File object to metadata since files can't be serialized directly)
    const dataToSave = {
      ...formData,
      verificationDocument: formData.verificationDocument ? {
        name: formData.verificationDocument.name,
        size: formData.verificationDocument.size,
        type: formData.verificationDocument.type,
        lastModified: formData.verificationDocument.lastModified,
      } : null,
      submittedAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    try {
      localStorage.setItem('universityOnboardingData', JSON.stringify(dataToSave));
      console.log('Form data saved to localStorage:', dataToSave);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      alert('Application submitted, but there was an issue saving locally. Please try again.');
    }
  };

  return (
    <div className="university-onboarding-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Success Screen */}
        {isSubmitted && (
          <SubmissionSuccess 
            formData={formData} 
            onReset={() => {
              setIsSubmitted(false);
              setCurrentStep(0);
              setFormData({
                institutionName: '', country: '', city: '', institutionType: 'University', accreditation: '',
                programs: [{ name: '', degree: '', language: '', duration: '' }],
                acceptanceRate: '', gmatRequired: false, greRequired: false, ieltsMinScore: '', toeflMinScore: '', requiredDocuments: [],
                tuitionRange: '', scholarshipsAvailable: false, scholarshipAmount: '', paymentPlans: false,
                contactName: '', contactEmail: '', contactPhone: '', websiteUrl: '', verificationDocument: null,
              });
            }}
          />
        )}

        {!isSubmitted && (
          <>
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Partner with UniBridge
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of universities connecting with ambitious students worldwide. Complete this quick onboarding to get started.
          </p>
        </div>

        {/* Stepper */}
        <StepperIndicator steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="university-form-container mt-12">
          <div className="step-content animate-fade-in">
            {currentStep === 0 && (
              <InstitutionDetailsStep formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 1 && (
              <AcademicProgramsStep
                formData={formData}
                handleProgramChange={handleProgramChange}
                addProgram={addProgram}
                removeProgram={removeProgram}
              />
            )}
            {currentStep === 2 && (
              <AdmissionsRequirementsStep
                formData={formData}
                handleInputChange={handleInputChange}
                handleDocumentToggle={handleDocumentToggle}
              />
            )}
            {currentStep === 3 && (
              <TuitionScholarshipsStep formData={formData} handleInputChange={handleInputChange} />
            )}
            {currentStep === 4 && (
              <ContactVerificationStep formData={formData} handleInputChange={handleInputChange} />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="step-navigation mt-12 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 text-slate-800 hover:bg-slate-300"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02]"
              >
                <CheckCircle size={20} />
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </form>

        {/* Progress Info */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          Step {currentStep + 1} of {steps.length}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * StepperIndicator Component
 */
const StepperIndicator = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      <div className="stepper-track">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="stepper-item-wrapper">
              <div
                className={`stepper-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
              >
                <div className={`stepper-circle ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  {isCompleted ? (
                    <CheckCircle size={24} className="text-white" />
                  ) : (
                    <StepIcon size={20} className="text-white" />
                  )}
                </div>
                <div className="stepper-label">
                  <p className="stepper-title">{step.title}</p>
                  <p className="stepper-desc">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Step 1: Institution Details
 */
const InstitutionDetailsStep = ({ formData, handleInputChange }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Institution Details</h2>
      <p className="step-subtitle">Help us know your university better</p>

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

/**
 * Step 2: Academic Programs
 */
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

/**
 * Step 3: Admissions & Requirements
 */
const AdmissionsRequirementsStep = ({ formData, handleInputChange, handleDocumentToggle }) => {
  const documentOptions = ['Passport', 'Bachelor Degree', 'GMAT/GRE Score', 'English Proficiency (IELTS/TOEFL)', 'Statement of Purpose', 'Recommendation Letters', 'CV/Resume'];

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
        <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
        <div className="documents-grid">
          {documentOptions.map((doc) => (
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

/**
 * Step 4: Tuition & Scholarships
 */
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
          <option value="0-5000">$0 - $5,000</option>
          <option value="5000-15000">$5,000 - $15,000</option>
          <option value="15000-30000">$15,000 - $30,000</option>
          <option value="30000-50000">$30,000 - $50,000</option>
          <option value="50000+">$50,000+</option>
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

/**
 * Step 5: Contact & Verification
 */
const ContactVerificationStep = ({ formData, handleInputChange }) => {
  return (
    <div className="step-panel">
      <h2 className="step-title">Contact & Verification</h2>
      <p className="step-subtitle">Complete your profile and verify</p>

      <div className="form-group">
        <label>Contact Person Name *</label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleInputChange}
          placeholder="e.g., John Admissions Director"
          className="form-input"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="admissions@university.edu"
            className="form-input"
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

/**
 * SubmissionSuccess Component
 * Displays after successful form submission with summary and localStorage confirmation
 */
const SubmissionSuccess = ({ formData, onReset }) => {
  const submittedAt = new Date(formData.submittedAt || new Date()).toLocaleString();
  
  return (
    <div className="submission-success-container animate-fade-in-up">
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
        <p className="text-lg text-slate-600 mb-8">Your onboarding application has been successfully saved and received.</p>
        
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
            <span className="detail-value text-green-600 font-semibold">✓ Saved to LocalStorage</span>
          </div>
        </div>
        
        <div className="success-message-box">
          <p className="text-slate-700">
            Your complete application data has been securely saved to your browser's local storage. Our team will review your submission and contact you at the provided email address within 3-5 business days.
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

export default UniversityOnboarding;
