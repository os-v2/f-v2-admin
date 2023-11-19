import { Checkbox, Table } from "semantic-ui-react";
import { IHeaderTypeProps } from "../../pages/MakersManagePage/TableData/makersManageTable";
import { useState } from "react";
import { IModalOpenType } from "../../utils/types/modalType";
interface ITableTypeProps {
  data: Array<IHeaderTypeProps>;
  headerData: IHeaderTypeProps;
  selectable?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<IModalOpenType>>;
}
const Component = ({ data, headerData, selectable = false, setOpen }: ITableTypeProps) => {
  const keys = Object.keys(headerData);
  const [checked, setChecked] = useState([]);
  const handleRowClick = (_e: React.MouseEvent<HTMLTableRowElement>, id: number) => {
    if (!selectable)
      return;
    if (setOpen)
      setOpen({
        id: id,
        open: true,
        isEdit: true,
      });
  };
  return (
    <Table celled selectable={selectable}>
      <Table.Header>
        <Table.Row>
          {keys.map(data => {
            return <Table.HeaderCell key={data}>{headerData[data]}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => {
          const dummyKeys = Object.keys(row).filter((v) => v !== "id");
          const isChecked = keys.includes("checked");
          return <Table.Row key={row.id as string} onClick={(e: React.MouseEvent<HTMLTableRowElement>) => handleRowClick(e, row.id)} style={{
            cursor: `${selectable ? "pointer" : "auto"}`
          }}>
            {isChecked && <Table.Cell><Checkbox
              checked={checked.includes(row.id as never)}
              onChange={() => {
                console.log(row.id);
                if (checked.includes(row.id as never)) {
                  setChecked(checked.filter((id) => id !== row.id));
                } else
                  setChecked([...checked, row.id as never]);
              }} /></Table.Cell>}
            {dummyKeys.map((cell) => {
              if (typeof row[cell] === "boolean") {
                return <Table.Cell key={cell}>
                  {row[cell] ? "활성" : "비활성"}
                </Table.Cell>;
              }
              return <Table.Cell key={cell}>
                {row[cell]}
              </Table.Cell>;
            })}
          </Table.Row>;
        })}
      </Table.Body>
    </Table>
  );
};

export default Component;

