import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitUniversityOnboarding } from '../../services/onboardingService';
import { useOnboardingForm } from './hooks/useOnboardingForm';
import { validateStep } from './utils/validation';
import { ONBOARDING_STEPS } from './utils/constants';
import StepperIndicator from './components/StepperIndicator';
import InstitutionDetailsStep from './components/InstitutionDetailsStep';
import AcademicProgramsStep from './components/AcademicProgramsStep';
import AdmissionsRequirementsStep from './components/AdmissionsRequirementsStep';
import TuitionScholarshipsStep from './components/TuitionScholarshipsStep';
import ContactVerificationStep from './components/ContactVerificationStep';
import SubmissionSuccess from './components/SubmissionSuccess';
import '../../styles/UniversityOnboarding.css';

const UniversityOnboarding = () => {
  const { user } = useAuth();
  const {
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleProgramChange,
    addProgram,
    removeProgram,
    handleDocumentToggle,
    resetForm,
  } = useOnboardingForm(user);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (validateStep(currentStep, formData, user, setValidationError)) {
      if (currentStep < ONBOARDING_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setValidationError('You must be logged in to submit an onboarding application.');
      setCurrentStep(0);
      return;
    }

    setIsSubmitting(true);
    setValidationError('');
    setSubmissionError('');

    try {
      const result = await submitUniversityOnboarding(formData, user, formData.verificationDocument);
      console.log('Submission result:', result);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionError(error.message || 'Failed to submit onboarding application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(0);
    resetForm();
  };

  return (
    <div className="university-onboarding-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Success Screen */}
        {isSubmitted && (
          <SubmissionSuccess formData={formData} onReset={handleReset} />
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
            <StepperIndicator currentStep={currentStep} />

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="university-form-container mt-12">
              {validationError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <span>{validationError}</span>
                </div>
              )}

              <div className="step-content animate-fade-in">
                {currentStep === 0 && (
                  <InstitutionDetailsStep
                    formData={formData}
                    handleInputChange={handleInputChange}
                    user={user}
                    submissionError={submissionError}
                  />
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
                  <ContactVerificationStep formData={formData} handleInputChange={handleInputChange} user={user} />
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

                {currentStep === ONBOARDING_STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep(currentStep, formData, user, setValidationError)) {
                        handleSubmit({ preventDefault: () => {} });
                      }
                    }}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={20} />
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UniversityOnboarding;
