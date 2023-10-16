import React from "react";

const SideInputField = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      type="text"
      className="add-guests-location"
      placeholder={placeholder}
    />
  );
};

export default SideInputField;
