"use client";
import { Table } from "@/components/molecules/Table";
import { useGetPayments } from "@/hooks/usePayments";
import { usePaymentsStore } from "@/store/usePaymentsStore";

const TableHead = ["Sender Name", "Receiver Name", "Amount", "Currency"];

const TransactionTable = () => {
  const { isLoading, isError } = useGetPayments();
  const { getPayments } = usePaymentsStore((state) => state);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Table>
              <thead>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
