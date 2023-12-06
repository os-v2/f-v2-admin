import { Checkbox, Table } from "semantic-ui-react";
import { IHeaderTypeProps } from "../../pages/MakersManagePage/TableData/makersManageTable";
import { useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";
import { tMakersList } from "../../apis/makers";
import { tFoodsItem } from "../../apis/foods";
import withCommas from "../../utils/withCommas";
interface ITableTypeProps {
  data: Array<tMakersList> | Array<tFoodsItem> | undefined;
  headerData: IHeaderTypeProps;
  selectable?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
  checked: number[];
  setChecked: React.Dispatch<React.SetStateAction<number[]>>;
}
const Component = ({ data, headerData, selectable = false, setOpen, checked, setChecked }: ITableTypeProps) => {
  const keys = Object.keys(headerData);
  const handleRowClick = (_e: React.MouseEvent<HTMLTableRowElement>, id: number) => {
    if (!selectable)
      return;
    if (setOpen) {
      setOpen({
        id: id,
        open: true,
        isEdit: true,
      });

    }

  };
  if (!data) {
    return;
  }
  return (
    <Table celled selectable={selectable}>
      <Table.Header>
        <Table.Row>
          {keys.map(data => {
            return <Table.HeaderCell key={data} textAlign="center">{headerData[data]}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => {
          console.log(row);
          const dummyKeys = Object.keys(row).filter((v) => {
            if (v !== "id" && v !== "image" && v !== "makersId") return true;
          });
          const isChecked = keys.includes("checked");
          return <Table.Row key={row.id as number} onClick={(e: React.MouseEvent<HTMLTableRowElement>) => handleRowClick(e, row.id)} style={{
            cursor: `${selectable ? "pointer" : "auto"}`
          }} textAlign="center">
            {isChecked && <Table.Cell><Checkbox
              checked={checked.includes(row.id as never)}
              onChange={(e) => {
                e.stopPropagation();
                console.log(row.id);
                if (checked.includes(row.id as never)) {
                  setChecked(checked.filter((id) => id !== row.id));
                } else
                  setChecked([...checked, row.id as never]);
              }} /></Table.Cell>}
            {dummyKeys.map((cell) => {
              if (typeof row[cell] === "boolean") {
                return <Table.Cell key={cell} >
                  {row[cell] ? "활성" : "비활성"}
                </Table.Cell>;
              }
              return <Table.Cell key={cell} >
                {typeof row[cell] === "number" ? `${withCommas(row[cell] as number)}원` : row[cell]}
              </Table.Cell>;
            })}
          </Table.Row>;
        })}
      </Table.Body>
    </Table>
  );
};

export default Component;

