import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CSS from './Modal.module.css';

const modalRoot = document.querySelector('#modal_root');

export const Modal = ({ onClose, children }) => {
  const { Overlay, Modal } = CSS;

  const hedelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const closetEscKetdown = e => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', closetEscKetdown);

    return () => {
      document.removeEventListener('keydown', closetEscKetdown);
    };
  }, [onClose]);

  return createPortal(
    <div className={Overlay} onClick={hedelBackdropClick}>
      <div className={Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propType = {
  onClose: PropTypes.func,
  children: PropTypes.object,
};
