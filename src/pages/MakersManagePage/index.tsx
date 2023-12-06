import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { makersManageHeader } from "./TableData/makersManageTable";
import { Button } from "semantic-ui-react";
import MakersModal from "./components/MakersModal";
import { useEffect, useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";
import { tMakersDetail } from "../../apis/makers";
import { useMakers } from "../../hooks/makers";


export default function MakersPage() {
  const [checked, setChecked] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<IModalOpenType>({
    id: null,
    open: false,
    isEdit: false
  });

  const [data, setData] = useState<tMakersDetail | undefined>();

  const { makersList, makersDetail, detailRefetch, isLoading, isFetching, updateMakersStatus } = useMakers(openModal.id as number);
  const handleFoodStatusDisalbled = async () => {
    try {
      await updateMakersStatus({
        makersIds: checked,
        status: false
      });
      setChecked([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFoodStatusEnalbled = async () => {
    try {
      await updateMakersStatus({
        makersIds: checked,
        status: true
      });
      setChecked([]);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button color="blue" type="button" style={{ width: 150 }} onClick={handleFoodStatusEnalbled}>
        활성
      </Button>
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={handleFoodStatusDisalbled}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet
      checked={checked}
      setChecked={setChecked}
      data={makersList}
      headerData={makersManageHeader}
      selectable={true}
      setOpen={setOpenModal}
    />

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
