/**
 * Constants for University Onboarding form
 * Includes step definitions and document options
 */

export const ONBOARDING_STEPS = [
  { id: 0, title: 'Institution Details', icon: 'Building2' },
  { id: 1, title: 'Academic Programs', icon: 'BookOpen' },
  { id: 2, title: 'Admissions Requirements', icon: 'CheckCircle' },
  { id: 3, title: 'Tuition & Scholarships', icon: 'DollarSign' },
  { id: 4, title: 'Contact & Verification', icon: 'FileCheck' },
];

export const DOCUMENT_OPTIONS = [
  'High School Diploma / Equivalent',
  'Bachelor\'s Degree / Equivalent',
  'English Language Test (TOEFL/IELTS)',
  'Standardized Test (SAT/ACT/GRE)',
  'Statement of Purpose',
  'Letter of Recommendation',
  'Portfolio / Work Samples',
  'Interview',
];

export const DEGREE_OPTIONS = [
  { label: 'Bachelor\'s', value: 'bachelors' },
  { label: 'Master\'s', value: 'masters' },
  { label: 'Doctorate', value: 'doctorate' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Certificate', value: 'certificate' },
];

export const TUITION_RANGES = [
  { label: 'Free', value: 'free' },
  { label: 'Under $10,000/year', value: 'under_10k' },
  { label: '$10,000 - $25,000/year', value: '10k_25k' },
  { label: '$25,000 - $50,000/year', value: '25k_50k' },
  { label: 'Over $50,000/year', value: 'over_50k' },
];

export const COUNTRY_OPTIONS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Japan',
  'India',
  'China',
  'Brazil',
  'Mexico',
  'Singapore',
  'Other',
];
