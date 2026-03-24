/**
 * ⚠️ Modal Component
 * Reusable modal dialog with backdrop, title, and footer
 * Usage: <Modal isOpen={true} onClose={handleClose} title="Confirm">Content</Modal>
 */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

export function Modal({ isOpen, onClose, title, children, footer, closeButton = true }) {
  const modalRef = useRef(null);

 

  useEffect(() =>{
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
      document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
  },[isOpen, onClose]);


useEffect(() => {
  if (!isOpen) return;

  function handleTabKey(e) {
    if (e.key === "Tab") {
     
      const focusableElements = modalRef.current.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

    
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault(); 
          lastElement.focus(); 
        }
      } 
    
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  document.addEventListener("keydown", handleTabKey);
  const firstFocusable = modalRef.current.querySelector(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  if (firstFocusable) {
    firstFocusable.focus();
  }
  return () => {
    document.removeEventListener("keydown", handleTabKey);
  };
}, [isOpen]);

useEffect(() => {
  if (isOpen) {
 
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isOpen]); 

useEffect(() => {
  if (isOpen) {
  
    document.body.classList.add("modal-overlay--active");
  } else {

    document.body.classList.remove("modal-overlay--active");
  }

 
  return () => {
    document.body.classList.remove("modal-overlay--active");
  };
}, [isOpen]); 



  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
 if (!isOpen) return null;

return (
  <div className="modal-overlay" onClick={onClose}>
    <div
      className="flex flex-col bg-white rounded-lg shadow-lg w-full max-w-md mx-auto my-8 p-6 relative"
    
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {title && (
        <div className="modal-header">
          <h2 id="modal-title" className="margin-0 text-xl font-size-20 font-weight-600">
            {title}
          </h2>
          {closeButton && (
            <button
              className="bg-none, border-none, text-gray-666, hover:text-gray-700, cursor-pointer, absolute, top-4, right-4"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>
      )}
 
      <div className="p-24 mh-400 overflow-y-auto">
        {children}
      </div>

      {footer && (
        <div className="flex justify-end gap-12 padding-16-24 border-t-1-solid border-gray-200">
          {footer}
        </div>
      )}
    </div>
  </div>
);
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  closeButton: PropTypes.bool,
};
