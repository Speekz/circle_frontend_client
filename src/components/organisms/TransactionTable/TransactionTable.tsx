"use client";
import { Table } from "@/components/molecules/Table";
import { useGetPayments } from "@/hooks/usePayments";
import { tableHeadColumnsValues } from "@/lib/constants";
import { ITableColumns } from "@/lib/types";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { useMemo } from "react";

const TransactionTable = () => {
  const {} = useGetPayments();
  const { filters, tableColumns, getPaymentsFiltered } = usePaymentsStore(
    (state) => state
  );

  const computedTableColumns = useMemo(() => {
    const newTableColumns: string[] = [];
    tableHeadColumnsValues.forEach(({ name, value }) => {
      // @ts-expect-error tableColumns can be indexed via name
      if (tableColumns[name]) return newTableColumns.push(value);
    });

    return newTableColumns;
  }, [tableColumns]);

  return (
    <Table>
      <thead className="sticky top-0 bg-white border-b shadow-sm">
        <tr>
          {computedTableColumns.map((columnName, index) => (
            <Table.Head text={columnName} key={columnName + index} />
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {getPaymentsFiltered(25, filters).map((transaction) => (
          <tr key={transaction.id} className="hover:bg-slate-100">
            {tableColumns.transactionId && (
              <Table.Data data={transaction?.id} />
            )}
            {tableColumns.sender && (
              <Table.Data data={transaction?.sender?.name} />
            )}
            {tableColumns.receiver && (
              <Table.Data data={transaction?.receiver?.name} />
            )}
            {tableColumns.amount && <Table.Data data={transaction?.amount} />}
            {tableColumns.currency && (
              <Table.Data data={transaction?.currency} />
            )}
            {tableColumns.date && <Table.Data data={transaction?.date} />}
            {tableColumns.memo && (
              <Table.Data data={transaction?.memo as string} />
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
