import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Dropdown, DropdownItemProps, Input } from "semantic-ui-react";


export interface IComponentProps {
  name: string;
  placeholder?: string;
  search?: boolean;
  selection?: boolean;
  clearable?: boolean;
  defaultValue?: number | string | undefined;
  options: Array<DropdownItemProps>;
}

export default function Component(props: IComponentProps) {
  const { name, placeholder, search = false, selection = false, clearable = false, defaultValue, options } = props;
  const { control, setValue } = useFormContext();
  const [selectItem, setSelectItem] = useState<string | number | boolean | (string | number | boolean)[] | undefined>();
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      setSelectItem(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue && defaultValue}
      render={() => {
        return (
          <Dropdown
            placeholder={placeholder}
            fluid
            search={search}
            selection={selection}
            clearable={clearable}
            value={selectItem}
            options={options}
            onChange={(_e, data) => {
              setValue(name, data.value);
              setSelectItem(data.value);
            }}
          />
        );
      }} />
  );
}
