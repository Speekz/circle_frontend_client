import { FC } from "react";
import classnames from "classnames";

interface ITableHead {
  text: string;
  className?: string;
}

const TableHead: FC<ITableHead> = ({ text, className }) => {
  return (
    <th
      scope="col"
      className={classnames(
        "whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900",
        className
      )}
    >
      {text}
    </th>
  );
};

TableHead.displayName = "TableHead";

export default TableHead;
