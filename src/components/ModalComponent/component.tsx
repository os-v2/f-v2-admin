import * as React from "react";
import { Modal } from "semantic-ui-react";
import { IModalOpenType } from "../../utils/types/modalType";
import styled, { css } from "styled-components";
interface IComponentProps {
  title: string;
  children: React.ReactNode;
  action: React.ReactNode;
  open: IModalOpenType;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
  loading?: boolean;
}
interface IModalContentProps {
  loading: string | undefined;
}
const Component = ({ title, children, action, open, setOpen, loading }: IComponentProps) => {
  return (
    <Modal
      open={open.open}
      onOpen={() => setOpen({
        id: open.id,
        open: true,
        isEdit: false
      })}
      onClose={() => setOpen({
        id: open.id,
        open: false,
        isEdit: false
      })}
      trigger={action}>
      <Modal.Header>
        {title}
      </Modal.Header>
      <Modal.Content>
        <ModalContent loading={loading?.toString()}>
          {children}
        </ModalContent>
      </Modal.Content>
      <Modal.Actions >

      </Modal.Actions>
    </Modal>
  );
};

export default Component;

const ModalContent = styled.div<IModalContentProps>`
 ${({ loading }) => {
    if (loading === "true")
      return css`
      height: 70vh;
      overflow: hidden;
    `;
  }}
`;
