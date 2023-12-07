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
  const [checked, setChecked] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState<IModalOpenType>({
    id: null,
    open: false,
    isEdit: false
  });
  const { foodItemList, foodMakersList, foodItemDetail, foodItemDetailRefetch, foodDetailLoading, updateFoodStatus } = useFood(openModal.id);
  const handleFoodStatusDisalbled = async () => {
    try {
      await updateFoodStatus({
        foodIds: checked,
        status: false
      });
      setChecked([]);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedImages, setSelectedImages] = useState<Array<string | File>>([]);
  const handleFoodStatusEnalbled = async () => {
    try {
      await updateFoodStatus({
        foodIds: checked,
        status: true
      });
      setChecked([]);
    } catch (error) {
      console.log(error);
    }
  };
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
    if (!openModal.open)
      setSelectedImages([]);
  }, [openModal.id, openModal.open]);
  return <Wrraper>
    <ButtonContainer>
      <FoodModal
        open={openModal}
        setOpen={setOpenModal}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        options={options as DropdownItemProps[]}
        isLoading={foodDetailLoading}
        foodItemDetail={foodItemDetail as tFoodItemDetail}
      />
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
      data={foodItemList}
      headerData={foodManageHeader}
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
