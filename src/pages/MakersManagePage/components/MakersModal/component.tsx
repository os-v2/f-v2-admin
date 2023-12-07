import React, { SetStateAction, useEffect, useState } from "react";
import { Button, CommentText, Label, TextArea } from "semantic-ui-react";
import ModalComponent from "../../../../components/ModalComponent";
import styled, { useTheme } from "styled-components";
import { Controller, FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploader from "../../../../components/ImageUploader";
import { IModalOpenType } from "../../../../utils/types/modalType";
import { ClipLoader } from "react-spinners";
import InputComponent from "../../../../components/InputComponent";
import { tMakersDetail } from "../../../../apis/makers";
import { useMakers } from "../../../../hooks/makers";

interface IModalProps {
  makersDetail: tMakersDetail;
  isLoading: boolean;
  isFetching: boolean;
  selectedImages: Array<string | File>;
  setSelectedImages: React.Dispatch<SetStateAction<Array<string | File>>>

  open: IModalOpenType;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
}
const Componenet = ({ makersDetail, isLoading, isFetching, open, setOpen, selectedImages,
  setSelectedImages, }: IModalProps) => {
  const themeApp = useTheme();
  const { insertMakers } = useMakers(makersDetail?.id);
  const form = useForm({
    mode: "all",
  });

  const { handleSubmit, control } = form;
  const onSubmit = async (field: FieldValues) => {
    const formData = new FormData();
    const data = {
      "storeName": field.storeName,
      "description": field.description,
      "address": {
        "zipCode": field.zipCode.slice(0, 4),
        "address1": field.address,
        "address2": field.address2
      }
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
      await insertMakers(formData);
      setOpen({
        id: open.id,
        isEdit: false,
        open: false
      });

    } catch (error) {
      console.log(error?.toString());
    }

  };

  return (
    <ModalComponent
      title={!open.isEdit ? "메이커스 추가" : "메이커스 수정"}
      open={open}
      setOpen={setOpen}
      loading={isLoading || isFetching}
      action={
        <Button color="green" type="button" style={{ width: 150 }}>
          추가
        </Button>
      }
    >
      {isLoading || isFetching && <LoadindFace >
        <ClipLoader
          color={themeApp.colors.grey[5]}
          loading={isLoading || isFetching}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </LoadindFace>}
      <FormProvider {...form}>
        <InputLine>
          <InputBox>
            <Label>메이커스 이름</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.storeName : ""} placeholder="메이커스 이름" type="text" name="storeName" />
          </InputBox>
          <InputBox>
            <Label>코드</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.code : ""} placeholder="코드" type="text" name="code" />
          </InputBox>
          <InputBox>
            <Label>비밀번호</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.password : ""} placeholder="비밀번호" type="text" name="password" />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>담당자</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.manager : ""} placeholder="담당자" type="text" name="manager" />
          </InputBox>
          <InputBox>
            <Label>전화번호</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.phone : ""} placeholder="전화번호" type="text" name="phone" />
          </InputBox>
          <InputBox>
            <Label>사업자 번호</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.companyRegistrationNumber : ""} placeholder="사업자 번호" type="text" name="companyRegistrationNumber" />
            {/* <StyleInput {...register("businessNumber")} value={data ? data.businessNumber : ""} /> */}
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>계좌은행</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.bank : ""} placeholder="계좌은행" type="text" name="bank" />
          </InputBox>
          <InputBox>
            <Label>계좌명</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.depositHolder : ""} placeholder="계좌명" type="text" name="depositHolder" />
          </InputBox>
          <InputBox>
            <Label>계좌번호</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.accountNumber : ""} placeholder="계좌번호" type="text" name="accountNumber" />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox2>
            <Label>주소</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.address : ""} placeholder="주소" type="text" name="address" />
          </InputBox2>
          <InputBox>
            <Label>우편번호</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.zipCode : ""} placeholder="우편번호" type="text" name="zipCode" />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>상세주소</Label>
            <InputComponent defaultValue={open.isEdit ? makersDetail?.address2 : ""} placeholder="상세주소" type="text" name="address2" />
          </InputBox>
        </InputLine>
        {/* <CommentText>요일 별 업무시간</CommentText> */}
        {/* <Table definition celled compact>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell />
              <Table.HeaderCell>월</Table.HeaderCell>
              <Table.HeaderCell>화</Table.HeaderCell>
              <Table.HeaderCell>수</Table.HeaderCell>
              <Table.HeaderCell>목</Table.HeaderCell>
              <Table.HeaderCell>금</Table.HeaderCell>
              <Table.HeaderCell>토</Table.HeaderCell>
              <Table.HeaderCell>일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell style={{ width: 80 }}>시작</Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startMon} type="text" name="startMon" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startTue} type="text" name="startTue" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startWed} type="text" name="startWed" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startThi} type="text" name="startThi" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startFri} type="text" name="startFri" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startSat} type="text" name="startSat" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.startSun} type="text" name="startSun" /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ width: 80 }}>마감</Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endMon} type="text" name="endMon" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endTue} type="text" name="endTue" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endWed} type="text" name="endWed" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endThi} type="text" name="endThi" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endFri} type="text" name="endFri" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endSat} type="text" name="endSat" /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><InputComponent defaultValue={open.isEdit ? data?.endSun} type="text" name="endSun" /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table> */}
        <ImageUploadBox>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages} />
        </ImageUploadBox>
        <CommentText>메이커스 소개</CommentText>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange } }) => {
            return <TextArea rows={5} onChange={onChange} defaultValue={open.isEdit ? makersDetail?.description : ""} placeholder={"메이커스 소개"} style={{
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
    </ModalComponent>
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