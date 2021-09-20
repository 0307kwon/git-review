import React, { ReactNode, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import {
  ModalContainer,
  ModalInner,
  ModalInnerContent,
} from "./ModalProvider.styles";

interface Props {
  children: ReactNode;
}

interface ModalContext {
  openModal: (modalComponent: ReactNode) => void;
  closeModal: () => void;
}

export const Context = React.createContext<ModalContext | null>(null);

const modalRoot = document.getElementById("modal-root");

const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (modalComponent: ReactNode) => {
    setModal(modalComponent);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickDimmed = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const modalElement: React.ReactNode = (
    <ModalContainer onMouseDown={handleClickDimmed}>
      <ModalInner>
        <ModalInnerContent>{modal && modal}</ModalInnerContent>
      </ModalInner>
    </ModalContainer>
  );

  const contextValue = useMemo(() => ({ openModal, closeModal }), []);

  return (
    <Context.Provider value={contextValue}>
      {children}
      {isOpen && modalRoot && ReactDOM.createPortal(modalElement, modalRoot)}
    </Context.Provider>
  );
};

export default ModalProvider;
