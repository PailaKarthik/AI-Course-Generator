import React from "react";
import PropTypes from "prop-types";

export const Badge = ({ text, variant = "default", className = "" }) => {
  const baseStyles = "inline-block px-2 py-1 text-sm font-bold rounded";
  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    primary: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-gray-800",
    error: "bg-red-500 text-white",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`;

  return <span className={combinedStyles}>{text}</span>;
};

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "primary", "success", "warning", "error"]),
  className: PropTypes.string,
};

Badge.defaultProps = {
  variant: "default",
  className: "",
};
