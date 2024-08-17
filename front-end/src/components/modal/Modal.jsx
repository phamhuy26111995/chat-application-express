import React from "react";


const Modal = ({ isOpen, onClose, title, children }) => {
    return (
      <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4">{children}</div>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>Đóng</button>
          </div>
        </div>
      </div>
    );
  };

export default Modal;
