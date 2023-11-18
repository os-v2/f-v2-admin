import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { dummyData, makersManageHeader } from "./TableData/makersManageTable";
import { Button } from "semantic-ui-react";
import MakersModal from "./components/MakersModal";


export default function MakersPage() {

  return <Wrraper>
    <ButtonContainer>
      <MakersModal />
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={() => console.log("비활성")}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet data={dummyData} headerData={makersManageHeader} selectable={false} />

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
