import * as React from "react";
import { Button, CommentText, Label, Table, TextArea } from "semantic-ui-react";
import ModalComponent from "../../../../components/ModalComponent";
import styled, { useTheme } from "styled-components";
import { Controller, FieldValues, useForm } from "react-hook-form";
import ImageUploader from "../../../../components/ImageUploader";


const Componenet = () => {
  const themeApp = useTheme();
  const [data, setData] = React.useState<any>();
  const [selectedImages, setSelectedImages] = React.useState<Array<string | File>>([]);
  const { register, handleSubmit, control } = useForm({
    mode: "all"
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <ModalComponent
      title="메이커스 추가"
      action={
        <Button color="green" type="button" style={{ width: 150 }}>
          추가
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        <InputLine>
          <InputBox>
            <Label>메이커스 이름</Label>
            <StyleInput {...register("makersName")} />
          </InputBox>
          <InputBox>
            <Label>코드</Label>
            <StyleInput {...register("code")} />
          </InputBox>
          <InputBox>
            <Label>비밀번호</Label>
            <StyleInput {...register("password")} />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>담당자</Label>
            <StyleInput {...register("manager")} />
          </InputBox>
          <InputBox>
            <Label>전화번호</Label>
            <StyleInput {...register("phone")} />
          </InputBox>
          <InputBox>
            <Label>사업자 번호</Label>
            <StyleInput {...register("businessNumber")} />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox>
            <Label>계좌은행</Label>
            <StyleInput {...register("accountBank")} />
          </InputBox>
          <InputBox>
            <Label>계좌명</Label>
            <StyleInput {...register("accountName")} />
          </InputBox>
          <InputBox>
            <Label>계좌번호</Label>
            <StyleInput {...register("accountNumber")} />
          </InputBox>
        </InputLine>
        <InputLine>
          <InputBox2>
            <Label>주소</Label>
            <StyleInput {...register("address")} />
          </InputBox2>
          <InputBox>
            <Label>우편번호</Label>
            <StyleInput {...register("zip")} />
          </InputBox>
        </InputLine>
        <CommentText>요일 별 업무시간</CommentText>
        <Table definition celled compact>
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
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startMon")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startTue")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startWed")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startThi")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startFri")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startSat")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("startSun")} style={{ width: 80 }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ width: 80 }}>마감</Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endMon")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endTue")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endWed")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endThi")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endFri")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endSat")} style={{ width: 80 }} /></Table.Cell>
              <Table.Cell style={{ width: 80 }}><StyleInput {...register("endSun")} style={{ width: 80 }} /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <ImageUploadBox>
          <ImageUploader
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            data={data}
            setData={setData} />
        </ImageUploadBox>
        <CommentText>메이커스 소개</CommentText>
        <Controller
          name="makersIntro"
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
          <Button color="green" type="submit" onClick={handleSubmit(onSubmit)}>추가</Button>
          <div style={{ padding: 24 }}></div>
          <Button color="youtube">취소</Button>
        </ButtonContainer>
      </form>
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
const StyleInput = styled.input`
  padding: 10px 12px;
  border : 1px solid ${({ theme }) => theme.colors.grey[6]};
  font-size: 14px;
  border-radius: 4px;
`;
const ImageUploadBox = styled.div`
  height: 250px;
`;