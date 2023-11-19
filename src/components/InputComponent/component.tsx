import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "semantic-ui-react";

export interface IComponentProps {
  name: string;
  placeholder?: string;
  type: string;
  label?: string;
  labelPosition?: "left corner" | "left" | "right" | "right corner";
  size?: "big" | "huge" | "large" | "small" | "mini" | "massive";
  defaultValue?: number | string | undefined;
}

export default function Component(props: IComponentProps) {
  const { name, placeholder, type, label, labelPosition = "left", size = "large", defaultValue } = props;
  const { control, setValue } = useFormContext();
  useEffect(() => {
    if (defaultValue)
      setValue(name, defaultValue);
  }, [defaultValue]);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue && defaultValue}
      render={({ field: { onChange } }) => {
        return <Input size={size} fluid defaultValue={defaultValue && defaultValue} labelPosition={labelPosition} placeholder={placeholder} onChange={onChange} type={type} label={label} />;
      }} />
  );
}
