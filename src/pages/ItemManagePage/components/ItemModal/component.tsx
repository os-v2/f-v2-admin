import React, { useEffect, useState } from "react";
import { Button, CommentText, Dropdown, Label, Table, TextArea } from "semantic-ui-react";
import ModalComponent from "../../../../components/ModalComponent";
import styled, { useTheme } from "styled-components";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploader from "../../../../components/ImageUploader";
import { IModalOpenType } from "../../../../utils/types/modalType";
import InputComponent from "../../../../components/InputComponent";
import { ClipLoader } from "react-spinners";
import DropdownComponent from "../../../../components/DropdownComponent";
import { IItemMageTypeProps } from "../../../../utils/types/itemManageType";

interface IModalProps {
  open: IModalOpenType;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
}
const options = [
  { key: 1, text: "김밥집", value: 1 },
  { key: 2, text: "파스타집", value: 2 },
  { key: 3, text: "돈까스집", value: 3 }
];
const Componenet = ({ open, setOpen }: IModalProps) => {

  const themeApp = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IItemMageTypeProps>();
  const [selectedImages, setSelectedImages] = useState<Array<string | File>>([]);
  const form = useForm({
    mode: "all"
  });
  const { handleSubmit, control } = form;
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  useEffect(() => {
    console.log(data);
    if (open.isEdit) {

      setIsLoading(true);
      setTimeout(() => {
        setData({
          makersId: 2,
          calorie: undefined,
          carbohydrate: undefined,
          fat: undefined,
          itemIntro: undefined,
          itemName: "오일 파스타",
          price: undefined,
          protein: undefined,
          supplyPrice: undefined,

        });

        setIsLoading(false);
      }, 1000);
    }
    else setData(undefined);
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
              defaultValue={data?.makersId}
              options={options}
            />
          </InputBox2>
          <InputBox>
            <Label>상품명</Label>
            <InputComponent defaultValue={data?.itemName} placeholder="상품명" type="text" name="itemName" />
          </InputBox>
          <InputBox>
            <Label>판매가</Label>
            <InputComponent defaultValue={data?.price} placeholder="판매가" type="number" name="price" />
          </InputBox>
          <InputBox>
            <Label>공급가</Label>
            <InputComponent defaultValue={data?.supplyPrice} placeholder="공급가" type="number" name="supplyPrice" />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>칼로리(kcal)</Label>
            <InputComponent defaultValue={data?.calorie} placeholder="칼로리" type="number" name="calorie" />
          </InputBox>
          <InputBox>
            <Label>탄수화물(g)</Label>
            <InputComponent defaultValue={data?.carbohydrate} placeholder="탄수화물" type="number" name="carbohydrate" />
          </InputBox>
          <InputBox>
            <Label>단백질(g)</Label>
            <InputComponent defaultValue={data?.protein} placeholder="단백질" type="number" name="protein" />
          </InputBox>
          <InputBox>
            <Label>지방(g)</Label>
            <InputComponent defaultValue={data?.fat} placeholder="지방" type="number" name="fat" />
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
          name="itemIntro"
          control={control}
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