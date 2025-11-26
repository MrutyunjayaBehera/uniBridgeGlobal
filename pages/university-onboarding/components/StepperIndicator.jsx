import React from 'react';
import { CheckCircle, Building2, BookOpen, DollarSign, FileCheck } from 'lucide-react';
import { ONBOARDING_STEPS } from '../utils/constants';

const ICON_MAP = {
  Building2,
  BookOpen,
  CheckCircle,
  DollarSign,
  FileCheck,
};

const StepperIndicator = ({ currentStep }) => {
  return (
    <div className="stepper-container">
      <div className="stepper-track">
        {ONBOARDING_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const iconName = step.icon;
          const StepIcon = ICON_MAP[iconName] || CheckCircle;

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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperIndicator;
