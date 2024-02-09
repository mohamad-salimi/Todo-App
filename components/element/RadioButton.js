import React from "react";

const RadioButton = ({ status, setStatus, value, title, children }) => {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={(e) => setStatus(e.target.value)}
        checked={status === value}
      />
    </div>
  );
};

export default RadioButton;
