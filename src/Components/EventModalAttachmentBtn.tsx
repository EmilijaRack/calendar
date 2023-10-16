import React from "react";

const AttachmentBtn = () => {
  return (
    <div>
      <button type="button" className="simple-btn">
        Add <em className="add-desc--underline">description</em> or
        <em className="add-desc--underline"> attachments</em>
      </button>
    </div>
  );
};

export default AttachmentBtn;
