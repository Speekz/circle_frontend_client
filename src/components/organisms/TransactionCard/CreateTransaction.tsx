import { FC } from "react";
import { Card } from "@/components/molecules/Card";
import { Button, Input } from "@headlessui/react";
import { customAlphabet } from "nanoid";

import Select from "react-select";
import { useUsersStore } from "@/store/useUsersStore";
import { useGetUsers } from "@/hooks/useUsers";
import { currenciesForSelector } from "@/lib/constants";
interface ICreateTransaction {
  onSubmit: () => void;
}

const CreateTransaction: FC<ICreateTransaction> = ({ onSubmit }) => {
  const { isLoading, isError } = useGetUsers();
  const { getUsersForSelector } = useUsersStore((state) => state);
  const nanoid = customAlphabet("1234567890", 16);
  return (
    <Card>
      <>
        <span className="text-lg font-bold">Create Transaction</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="w-80 flex flex-col"
        >
          <div className="flex flex-col gap-2 py-4">
            <div>
              <label
                htmlFor="transactionID"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Transaction ID
              </label>
              <Input
                readOnly
                id="transactionID"
                name="transactionID"
                type="text"
                placeholder="1234567890123456"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={nanoid()}
              />
            </div>
            <div>
              <label
                htmlFor="sender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sender
              </label>
              <Select
                id="sender"
                name="sender"
                options={getUsersForSelector()}
              />
            </div>
            <div>
              <label
                htmlFor="receiver"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Receiver
              </label>
              <Select
                id="receiver"
                name="receiver"
                options={getUsersForSelector()}
              />
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-full">
                <label
                  htmlFor="Amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <Input
                  id="Amount"
                  name="Amount"
                  type="text"
                  placeholder="123.00"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="Currency"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Currency
                </label>
                <Select
                  id="receiver"
                  name="receiver"
                  options={currenciesForSelector}
                />
              </div>
            </div>
          </div>
          <Button
            className="rounded self-center bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
            type="submit"
          >
            Create Payment
          </Button>
        </form>
      </>
    </Card>
  );
};

export default CreateTransaction;
