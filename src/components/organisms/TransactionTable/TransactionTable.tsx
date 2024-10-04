"use client";
import { Table } from "@/components/molecules/Table";
import { useGetPayments } from "@/hooks/usePayments";
import { usePaymentsStore } from "@/store/usePaymentsStore";

const TableHead = ["Sender Name", "Receiver Name", "Amount", "Currency"];

const TransactionTable = () => {
  const {} = useGetPayments();
  const { getPayments } = usePaymentsStore((state) => state);

  return (
    <Table>
      <thead className="sticky top-0 bg-white border-b shadow-sm">
        <tr>
          {TableHead.map((columnName, index) => (
            <Table.Head text={columnName} key={columnName + index} />
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {getPayments(25).map((transaction) => (
          <tr key={transaction.id} className="hover:bg-slate-100">
            <Table.Data data={transaction?.sender?.name} />
            <Table.Data data={transaction?.receiver?.name} />
            <Table.Data data={transaction?.amount} />
            <Table.Data data={transaction?.currency} />
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
