import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export interface OpenModalProps {
  content: JSX.Element;
  title: string;
  component: React.FC<{ onClick: () => void }>;
  label: string;
}

export default function OpenModal({
  content,
  title,
  component: Component,
}: OpenModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (): void => {
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <Component onClick={handleOpenModal} />{" "}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            <Component onClick={handleCloseModal} />{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
