import React from "react";

const DeleteConfirmation = ({ show, onCancel, onConfirm }) => {
  if (!show) return null; // Prevents rendering if show is false

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>⚠️ Confirm Deletion</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}> Yes</button>
          <button className="cancel-btn" onClick={onCancel}> No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
