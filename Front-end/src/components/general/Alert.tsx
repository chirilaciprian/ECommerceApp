// src/components/Alert.tsx
import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning'; // Define the types for alert
  message: string;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ type, message, isVisible }) => {
  if (!isVisible) return null; // Return nothing if the alert is not visible

  const alertTypeClass = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
  }[type];

  return (
    <div
      role="alert"
      className={`alert ${alertTypeClass} fixed top-4 right-4 items-center w-auto z-10 rounded-md shadow-lg`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
