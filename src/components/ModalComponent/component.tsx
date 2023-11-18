import * as React from "react";
import { Modal } from "semantic-ui-react";
interface IComponentProps {
  title: string;
  children: React.ReactNode;
  action: React.ReactNode;
}

const Component = (props: IComponentProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={props.action}>
      <Modal.Header>
        {props.title}
      </Modal.Header>
      <Modal.Content>
        {props.children}
      </Modal.Content>
      <Modal.Actions >

      </Modal.Actions>
    </Modal>
  );
};

export default Component;