import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { dummyItemData, itemManageHeader } from "./TableData/itemManageTable";
import { Button } from "semantic-ui-react";
import ItemModal from "./components/ItemModal";


export default function ItemManagePage() {

  return <Wrraper>
    <ButtonContainer>
      <ItemModal />
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={() => console.log("비활성")}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet data={dummyItemData} headerData={itemManageHeader} selectable={false} />

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
