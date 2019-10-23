import React from 'react';
import '../../App.css';

const Square = ({ value, onClick, isHighlight }) => {
  return (
    <button
      type="button"
      className={isHighlight ? 'square square-highlight' : 'square'}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
