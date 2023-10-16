import React from "react";

const SimpleBtn = ({ value }: { value: string }) => {
  return (
    <button type="button" className="simple-btn">
      {value}
    </button>
  );
};

export default SimpleBtn;
