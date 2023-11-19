import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { dummyItemData, itemManageHeader } from "./TableData/itemManageTable";
import { Button } from "semantic-ui-react";
import ItemModal from "./components/ItemModal";
import { useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";


export default function ItemManagePage() {
  const [openModal, setOpenModal] = useState<IModalOpenType>({
    id: null,
    open: false,
    isEdit: false
  });

  return <Wrraper>
    <ButtonContainer>
      <ItemModal open={openModal} setOpen={setOpenModal} />
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={() => console.log("비활성")}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet data={dummyItemData} headerData={itemManageHeader} selectable={true} setOpen={setOpenModal} />

  </Wrraper>;
}

const Wrraper = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
  padding: 24px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
