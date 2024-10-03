import { FC } from "react";
import { Card } from "@/components/molecules/Card";
import { Button, Input } from "@headlessui/react";
import { customAlphabet } from "nanoid";

import Select, { StylesConfig } from "react-select";
import { useUsersStore } from "@/store/useUsersStore";
import { useGetUsers } from "@/hooks/useUsers";
import { currenciesForSelector } from "@/lib/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface ICreateTransaction {
  onSubmit: () => void;
  onClose: () => void;
}

const selectorColourStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? "#4f46e5" : "#d1d5db",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? "#4f46e5"
      : state.isFocused
      ? "#a5b4fc"
      : "white",
  }),
};

const CreateTransaction: FC<ICreateTransaction> = ({ onSubmit, onClose }) => {
  const {} = useGetUsers();
  const { getUsersForSelector } = useUsersStore((state) => state);
  const nanoid = customAlphabet("1234567890", 16);
  return (
    <Card>
      <>
        <div className="flex flex-row justify-between items-center">
          <span className="text-lg font-bold">Create Transaction</span>
          <div className="select-none cursor-pointer" onClick={onClose}>
            <XMarkIcon width={20} height={20} />
          </div>
        </div>
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
                styles={selectorColourStyles}
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
                styles={selectorColourStyles}
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
                  type="number"
                  maxLength={10000}
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
                  styles={selectorColourStyles}
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
