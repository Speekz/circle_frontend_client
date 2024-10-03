import { ComponentProps, FC } from "react";
import TableData from "./TableData";
import TableHead from "./TableHead";

interface ITable extends FC<ComponentProps<"div">> {
  Data: typeof TableData;
  Head: typeof TableHead;
}

const Table: ITable = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">{children}</table>
  );
};

Table.displayName = "Table";
Table.Data = TableData;
Table.Head = TableHead;

export default Table;
