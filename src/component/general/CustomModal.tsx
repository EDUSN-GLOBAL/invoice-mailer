import { Button, ModalFooter } from "@nextui-org/react";

const CustomModal = ({ children, onClose, action,actionText }: { children: React.ReactNode; onClose: () => void; action: () => void,actionText:string }) => {
  return (
    <>
      {children}
      <ModalFooter>
        <Button color="danger" onPress={onClose}>
          Close
        </Button>
        <Button onPress={action}>
          {actionText}
        </Button>
      </ModalFooter>
    </>
  );
};

export default CustomModal;
