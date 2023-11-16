import React from 'react';
import "./modal.css"
import { Button } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <Button onClick={onClose}></Button>
      </div>
    </div>
  );
};

export default Modal;
