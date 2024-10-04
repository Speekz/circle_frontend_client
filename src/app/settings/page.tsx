"use client";

import {
  tablePaymentsSchema,
  TTablePaymentsSchema,
} from "@/lib/validators/tablePaymentsSchema";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { Button } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { tableColumns, setTableColumns } = usePaymentsStore((state) => state);

  const { register, handleSubmit } = useForm({
    defaultValues: tableColumns,
    resolver: zodResolver(tablePaymentsSchema),
  });

  const onSubmit = (data: TTablePaymentsSchema) => {
    toast.success("Updated columns!");
    setTableColumns(data);
  };

  return (
    <div className="px-4 pt-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Settings Page</h1>
      <div className="flex flex-col pt-4">
        <h2 className="text-lg font-medium">Add columns to payments table</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-2 pl-2">
          <div className="pb-4">
            <div className="flex gap-2 items-center">
              <input
                id="transactionId"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("transactionId")}
              />
              <label
                htmlFor="transactionId"
                className="font-medium text-gray-900"
              >
                Transaction ID
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="sender"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("sender")}
              />
              <label htmlFor="sender" className="font-medium text-gray-900">
                Sender
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="receiver"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("receiver")}
              />
              <label htmlFor="receiver" className="font-medium text-gray-900">
                Receiver
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="amount"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("amount")}
              />
              <label htmlFor="amount" className="font-medium text-gray-900">
                Amount
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="currency"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("currency")}
              />
              <label htmlFor="currency" className="font-medium text-gray-900">
                Currency
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="memo"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("memo")}
              />
              <label htmlFor="memo" className="font-medium text-gray-900">
                Memo
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                id="date"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                {...register("date")}
              />
              <label htmlFor="date" className="font-medium text-gray-900">
                Date
              </label>
            </div>
          </div>
          <Button
            className="rounded self-center bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
