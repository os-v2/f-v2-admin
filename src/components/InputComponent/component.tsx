import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "semantic-ui-react";

export interface IComponentProps {
  name: string;
  placeholder: string;
  type: string;
  label?: string;
  labelPosition?: "left corner" | "left" | "right" | "right corner";
  size?: "big" | "huge" | "large" | "small" | "mini" | "massive"
}

export default function Component(props: IComponentProps) {
  const { name, placeholder, type, label, labelPosition = "left", size = "large" } = props;
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return <Input size={size} fluid labelPosition={labelPosition} placeholder={placeholder} onChange={onChange} type={type} label={label} />;
      }} />
  );
}
