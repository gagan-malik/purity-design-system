import React, { ReactNode, useState } from "react";
import Modal from "../Modal";
import ModalFooter from "../ModalFooter";
import ActionButton from "../common/ActionButton";
import BasicForm from "../common/BasicForm";

interface ISampleProps {
  header: string | ReactNode;
  footer: string | ReactNode;
  widthVariant: 'small' | 'default' | 'large' | 'full';
  onShown: () => void;
}

const ModalContainer = (props: ISampleProps) => {
  const { header, widthVariant, onShown } = props;
  const [showModal, setShowModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full h-[450px]">
        THIS IS JUST A WRAPPER COMPONENT TO DEMO THE USAGE OF MODAL.
        <div className="max-w-[200px]">
          <ActionButton onClick={() => setShowModal(!showModal)}>
            Open Modal
          </ActionButton>
        </div>
      </div>
      {showModal && (
        <Modal
          header={header}
          footer={
            <ModalFooter
              closeActionLabel={"Close"}
              onCancel={onClose}
              onShown={onShown}
            />
          }
          onClose={onClose}
          widthVariant={widthVariant}
        >
          {<BasicForm />}
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
