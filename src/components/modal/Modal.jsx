import { useEffect } from 'react';
import style from './modal.module.css';

const Modal = ({ toggleModal, link }) => {
  const closeModal = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleEsc = ({ code }) => {
      if (code === 'Escape') toggleModal();
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [toggleModal]);

  return (
    <div className={style.overlay} onClick={e => closeModal(e)}>
      <div className={style.modal}>
        <img src={link} alt="" />
      </div>
    </div>
  );
};
export default Modal;
