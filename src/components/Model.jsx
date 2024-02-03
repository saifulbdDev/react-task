import React, { useEffect } from 'react';

const Modal = ({ children, header, show, hideModal }) => {
  // Add an event listener for clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector('.modal-content');
      // Check if the click occurred outside the modal content
      if (modalContent && !modalContent.contains(event.target)) {
        hideModal();
      }
    };

    // Add event listener when the modal is shown
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove event listener when the modal is hidden
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, hideModal]);

  return (
    <div
      className={`modal ${show ? ' modal-show' : ''}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content ">
          <div className="modal-header  position-relative">{header}</div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;