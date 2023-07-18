import React from 'react';

export const Alert = ({ type, message }) => {
  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
    </div>
  );
};

// export default Alert;
