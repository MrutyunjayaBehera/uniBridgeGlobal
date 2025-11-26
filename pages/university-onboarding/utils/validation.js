/**
 * Validation utility for University Onboarding form
 * Contains all validation logic for each step
 */

export function validateStep(stepIndex, formData, user, setValidationError) {
  setValidationError('');

  if (stepIndex === 0) {
    // Step 1: Institution Details - Check mandatory fields
    if (!user) {
      setValidationError('Please log in first to continue with onboarding.');
      return false;
    }
    if (!formData.institutionName.trim()) {
      setValidationError('Institution Name is required.');
      return false;
    }
    if (!formData.country.trim()) {
      setValidationError('Country is required.');
      return false;
    }
    if (!formData.city.trim()) {
      setValidationError('City is required.');
      return false;
    }
    if (!formData.accreditation.trim()) {
      setValidationError('Accreditation Body is required.');
      return false;
    }
  } else if (stepIndex === 1) {
    // Step 2: Academic Programs - At least one valid program
    if (formData.programs.length === 0) {
      setValidationError('Add at least one academic program.');
      return false;
    }
    for (const prog of formData.programs) {
      if (!prog.name.trim()) {
        setValidationError('All programs must have a name.');
        return false;
      }
      if (!prog.degree) {
        setValidationError('All programs must have a degree type.');
        return false;
      }
      if (!prog.language.trim()) {
        setValidationError('All programs must have a language of instruction.');
        return false;
      }
      if (!prog.duration) {
        setValidationError('All programs must have a duration.');
        return false;
      }
    }
  } else if (stepIndex === 2) {
    // Step 3: Admissions Requirements
    if (!formData.acceptanceRate) {
      setValidationError('Acceptance Rate is required.');
      return false;
    }
    if (formData.requiredDocuments.length === 0) {
      setValidationError('Select at least one required document.');
      return false;
    }
  } else if (stepIndex === 3) {
    // Step 4: Tuition & Scholarships
    if (!formData.tuitionRange) {
      setValidationError('Tuition Range is required.');
      return false;
    }
  } else if (stepIndex === 4) {
    // Step 5: Contact & Verification
    if (!formData.contactPhone.trim()) {
      setValidationError('Contact Phone is required.');
      return false;
    }
    if (!formData.websiteUrl.trim()) {
      setValidationError('Website URL is required.');
      return false;
    }
    if (!formData.verificationDocument) {
      setValidationError('Verification document is required.');
      return false;
    }
  }

  return true;
}
