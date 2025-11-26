import { useState } from 'react';

/**
 * Custom hook for managing university onboarding form state and logic
 */
export function useOnboardingForm(user) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Institution Details
    institutionName: '',
    country: '',
    city: '',
    institutionType: 'University',
    accreditation: '',

    // Step 2: Academic Programs
    programs: [
      {
        name: '',
        degree: '',
        language: '',
        duration: '',
      },
    ],

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
    contactName: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
    contactEmail: user?.email || '',
    contactPhone: '',
    websiteUrl: '',
    verificationDocument: null,
  });

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

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(0);
    setFormData({
      institutionName: '',
      country: '',
      city: '',
      institutionType: 'University',
      accreditation: '',
      programs: [{ name: '', degree: '', language: '', duration: '' }],
      acceptanceRate: '',
      gmatRequired: false,
      greRequired: false,
      ieltsMinScore: '',
      toeflMinScore: '',
      requiredDocuments: [],
      tuitionRange: '',
      scholarshipsAvailable: false,
      scholarshipAmount: '',
      paymentPlans: false,
      contactName: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
      contactEmail: user?.email || '',
      contactPhone: '',
      websiteUrl: '',
      verificationDocument: null,
    });
  };

  return {
    // State
    currentStep,
    setCurrentStep,
    isSubmitted,
    setIsSubmitted,
    submissionError,
    setSubmissionError,
    validationError,
    setValidationError,
    isSubmitting,
    setIsSubmitting,
    formData,
    setFormData,

    // Handlers
    handleInputChange,
    handleProgramChange,
    addProgram,
    removeProgram,
    handleDocumentToggle,
    resetForm,
  };
}
