import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { dummyData, makersManageHeader } from "./TableData/makersManageTable";
import { Button } from "semantic-ui-react";
import MakersModal from "./components/MakersModal";
import { useEffect, useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";
import { useMakersDetail, useMakersListManage } from "../../hooks/makers";
import { tMakersDetail } from "../../apis/makers";


export default function MakersPage() {
  const [openModal, setOpenModal] = useState<IModalOpenType>({
    id: null,
    open: false,
    isEdit: false
  });

  const [data, setData] = useState<tMakersDetail | undefined>();
  const { makersList } = useMakersListManage();
  const { makersDetail, detailRefetch, isLoading, isFetching } = useMakersDetail(openModal.id as number);
  useEffect(() => {
    if (openModal.id)
      detailRefetch();
    if (!openModal.open) setData(undefined);
  }, [openModal.id, openModal.open]);
  useEffect(() => {
    console.log(makersDetail);
    setData(makersDetail);
  }, [makersDetail]);
  return <Wrraper>
    <ButtonContainer>
      <MakersModal makersDetail={data as tMakersDetail} isLoading={isLoading}
        isFetching={isFetching} open={openModal} setOpen={setOpenModal} />
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={() => console.log("비활성")}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet data={makersList} headerData={makersManageHeader} selectable={true} setOpen={setOpenModal} />

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
