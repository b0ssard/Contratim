import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export interface OpenModalProps {
  content: JSX.Element;
  title: string;
  component: React.FC<{ onClick: () => void }>;
  label: string;
}

const OpenModal: React.FC<OpenModalProps> = ({
  content,
  title,
  component: Component,
}: OpenModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Component onClick={handleOpenModal} />
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OpenModal;
