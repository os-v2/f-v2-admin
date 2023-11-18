import * as React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import InputComponent from "../../components/InputComponent";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export interface ILoginProps { }

export default function Login() {
  const form = useForm({ mode: "all" });
  const { handleSubmit } = form;
  const navigate = useNavigate();
  const onSubmit = (props: FieldValues) => {
    console.log(props);
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUFBQUEiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTcwMDIzMzIxNCwiZXhwIjoxNzAwMjYyMDE0fQ.SacjxCSmwqQGdnWsu6EDZZ89Iqz57MQdk1sjY_fuu1M");
    navigate("/");
  };
  return (
    <FormProvider {...form}>
      <Wrapper>
        <LoginBox>
          <InputBox>
            <InputComponent label="아이디" name="id" placeholder="아이디" type="text" />
          </InputBox>
          <InputBox>
            <InputComponent label="비밀번호" name="password" placeholder="비밀번호" type="password" />
          </InputBox>
          <Button fluid type="submit" onClick={handleSubmit(onSubmit)} size="large">
            로그인
          </Button>
        </LoginBox>
      </Wrapper >
    </FormProvider>
  );

}

const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.div`
  margin-bottom: 24px;
`;
const LoginBox = styled.div`
  width: 300px;
  justify-content: flex-start;
`;