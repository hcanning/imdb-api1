
import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-dark d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-white fs-5">Loading amazing movies...</p>
      </div>
    </div>
  );
};
