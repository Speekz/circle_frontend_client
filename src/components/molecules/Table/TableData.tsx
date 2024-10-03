import { FC } from "react";
import classnames from "classnames";

interface ITableData {
  data: string | number | null;
  className?: string;
}

const TableData: FC<ITableData> = ({ data, className }) => {
  return (
    <td
      className={classnames(
        "whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900",
        className
      )}
    >
      {data}
    </td>
  );
};

TableData.displayName = "TableData";

export default TableData;
