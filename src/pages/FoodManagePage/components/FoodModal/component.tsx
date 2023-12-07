import React, { SetStateAction, useEffect, useState } from "react";
import { Button, CommentText, Dropdown, DropdownItemProps, Label, Table, TextArea } from "semantic-ui-react";
import ModalComponent from "../../../../components/ModalComponent";
import styled, { useTheme } from "styled-components";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploader from "../../../../components/ImageUploader";
import { IModalOpenType } from "../../../../utils/types/modalType";
import InputComponent from "../../../../components/InputComponent";
import { ClipLoader } from "react-spinners";
import DropdownComponent from "../../../../components/DropdownComponent";
import { IItemMageTypeProps } from "../../../../utils/types/itemManageType";
import { useFood } from "../../../../hooks/food";
import { tFoodItemDetail } from "../../../../apis/foods";

interface IModalProps {
  open: IModalOpenType;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
  selectedImages: Array<string | File>;
  setSelectedImages: React.Dispatch<SetStateAction<Array<string | File>>>
  options: DropdownItemProps[];
  foodItemDetail: tFoodItemDetail;
  isLoading: boolean;
}


const Componenet = ({
  open,
  setOpen,
  selectedImages,
  setSelectedImages,
  options,
  foodItemDetail,
  isLoading }: IModalProps) => {

  const themeApp = useTheme();

  const { intertFood } = useFood(foodItemDetail?.makersId);
  const form = useForm({
    mode: "all"
  });
  const { handleSubmit, control } = form;
  const onSubmit = async (filed: FieldValues) => {
    const formData = new FormData();
    const data = {
      "name": filed.name,
      "price": filed.price,
      "supplyPrice": filed.supplyPrice,
      "description": filed.description,
      "makersId": filed.makersId,
      "calories": filed.calories,
      "carbohydrates": filed.carbohydrates,
      "protein": filed.protein,
      "fat": filed.fat
    };
    const jsonData = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    console.log(jsonData);
    formData.append("requestDto", jsonData);
    if (selectedImages?.length > 0) {
      for (let i = 0; i < selectedImages?.length; i++) {
        if (typeof selectedImages[i] === "object")
          formData.append("file", selectedImages[i]);
      }
    }
    for (const key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    try {
      await intertFood(formData);
      setOpen({
        id: open.id,
        isEdit: false,
        open: false
      });
      setSelectedImages([]);
    } catch (error) {
      console.log(error?.toString());
    }
  };
  useEffect(() => {
    setSelectedImages([]);
  }, [open]);
  return (
    <ModalComponent
      title={!open.isEdit ? "상품 추가" : "상품 수정"}
      open={open}
      setOpen={setOpen}
      loading={isLoading}
      action={
        <Button color="green" type="button" style={{ width: 150 }}>
          추가
        </Button>
      }
    >
      {isLoading && <LoadindFace >
        <ClipLoader
          color={themeApp.colors.grey[5]}
          loading={isLoading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </LoadindFace>}
      <FormProvider {...form}>
        <InputLine>
          <InputBox2>
            <Label>메이커스</Label>
            <DropdownComponent
              name="makersId"
              search
              selection
              clearable
              placeholder="메이커스 선택"
              defaultValue={open.isEdit ? foodItemDetail?.makersId ?? "" : ""}
              options={options}
            />
          </InputBox2>
          <InputBox>
            <Label>상품명</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.name ?? "" : ""} placeholder="상품명" type="text" name="name" />
          </InputBox>
          <InputBox>
            <Label>판매가</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.price ?? "" : ""} placeholder="판매가" type="number" name="price" />
          </InputBox>
          <InputBox>
            <Label>공급가</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.supplyPrice ?? "" : ""} placeholder="공급가" type="number" name="supplyPrice" />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>칼로리(kcal)</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.calories ?? "" : ""} placeholder="칼로리" type="number" name="calories" />
          </InputBox>
          <InputBox>
            <Label>탄수화물(g)</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.carbohydrates ?? "" : ""} placeholder="탄수화물" type="number" name="carbohydrates" />
          </InputBox>
          <InputBox>
            <Label>단백질(g)</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.protein ?? "" : ""} placeholder="단백질" type="number" name="protein" />
          </InputBox>
          <InputBox>
            <Label>지방(g)</Label>
            <InputComponent defaultValue={open.isEdit ? foodItemDetail?.fat ?? "" : ""} placeholder="지방" type="number" name="fat" />
          </InputBox>
        </InputLine>

        <ImageUploadBox>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            title="상품 이미지 추가" />
        </ImageUploadBox>
        <CommentText>상품 소개</CommentText>
        <Controller
          name="description"
          control={control}
          defaultValue={open.isEdit ? foodItemDetail?.description ?? "" : ""}
          render={({ field: { onChange, value } }) => {
            return <TextArea rows={5} onChange={onChange} value={value} style={{
              width: "100%",
              resize: "none",
              fontSize: 14,
              padding: 12,
              border: `1px solid ${themeApp.colors.grey[6]}`,
              borderRadius: 8,
            }} />;
          }}
        />
        <ButtonContainer>
          <Button color="green" type="submit" onClick={handleSubmit(onSubmit)}>{!open.isEdit ? "추가" : "수정"}</Button>
          <div style={{ padding: 24 }}></div>
          <Button color="youtube" onClick={() => setOpen({
            id: null,
            isEdit: false,
            open: false
          })}>취소</Button>
        </ButtonContainer>
      </FormProvider>
    </ModalComponent >
  );
};

export default Componenet;

const InputBox = styled.div`
  display:flex;
  flex:1;
  flex-direction:column;
`;
const InputBox2 = styled.div`
  display:flex;
  flex:2;
  flex-direction:column;
`;
const InputLine = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const ButtonContainer = styled.div`
  flex:1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ImageUploadBox = styled.div`
  height: 250px;
`;
const LoadindFace = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: #000000aa;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 999;
  right: 0;
  display: flex;
`;