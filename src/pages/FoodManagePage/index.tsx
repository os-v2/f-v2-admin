import TableCompoenet from "../../components/TableCompoenet";
import styled from "styled-components";
import { dummyItemData, foodManageHeader } from "./TableData/foodManageTable";
import { Button, DropdownItemProps } from "semantic-ui-react";
import FoodModal from "./components/FoodModal";
import { useEffect, useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";
import { useFood } from "../../hooks/food";
import { tFoodItemDetail } from "../../apis/foods";


export default function FoodManagePage() {

  const [options, setOption] = useState<DropdownItemProps[]>();
  const [openModal, setOpenModal] = useState<IModalOpenType>({
    id: null,
    open: false,
    isEdit: false
  });
  const { foodItemList, foodMakersList, foodItemDetail, foodItemDetailRefetch, foodDetailLoading } = useFood(openModal.id);

  useEffect(() => {
    setOption(foodMakersList?.map((food) => {
      return {
        key: food.id,
        text: food.name,
        value: food.id
      };
    }));
  }, [foodMakersList]);
  useEffect(() => {
    if (openModal.id !== null) {
      console.log(foodItemDetail);
      foodItemDetailRefetch();
    }
  }, [openModal.id]);
  return <Wrraper>
    <ButtonContainer>
      <FoodModal open={openModal} setOpen={setOpenModal} options={options as DropdownItemProps[]} isLoading={foodDetailLoading} foodItemDetail={foodItemDetail as tFoodItemDetail} />
      <Button color="youtube" type="button" style={{ width: 150 }} onClick={() => console.log("비활성")}>
        비활성
      </Button>
    </ButtonContainer>
    <TableCompoenet data={foodItemList} headerData={foodManageHeader} selectable={true} setOpen={setOpenModal} />

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
