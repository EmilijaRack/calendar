import React from "react";

const FormHeader = ({ onCloseBtnClick }: { onCloseBtnClick: () => void }) => {
  return (
    <section className="form-header">
      <button
        type="button"
        className="material-symbols-outlined close-btn"
        onClick={() => {
          onCloseBtnClick();
        }}
      >
        close
      </button>
    </section>
  );
};

export default FormHeader;
