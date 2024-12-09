import { forwardRef } from "react";
import "./Dialog.css"; 

const Dialog = forwardRef(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          zIndex: "9999",
        }}
      >
        {children}
        <button
          className="close-button" 
          onClick={toggleDialog}
        >
          x
        </button>
      </div>
    </dialog>
  );
});

export default Dialog;
