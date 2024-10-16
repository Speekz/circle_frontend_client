import { FC, useEffect, useMemo, useState } from "react";
import { Card } from "@/components/molecules/Card";
import { Button, Input, Textarea } from "@headlessui/react";
import { customAlphabet } from "nanoid";

import Select from "react-select";
import { useUsersStore } from "@/store/useUsersStore";
import { currenciesForSelector } from "@/lib/constants";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPaymentSchema,
  TCreatePaymentSchema,
} from "@/lib/validators/createPaymentSchema";
import { toast } from "react-toastify";
import { selectorColourStyles } from "@/lib/styles/selector";

interface ICreateTransaction {
  onSubmit: (data: TCreatePaymentSchema) => void;
  onClose: () => void;
  onLoading: boolean;
}

const nanoid = customAlphabet("1234567890", 16);

const CreateTransaction: FC<ICreateTransaction> = ({
  onSubmit,
  onClose,
  onLoading,
}) => {
  const [userSelected, setUserSelected] = useState("");
  const { getUsersForSelector } = useUsersStore((state) => state);
  const usersOptions = useMemo(() => {
    const users = getUsersForSelector();

    const usersFiltered = users.filter((c) => c.value !== userSelected);

    return usersFiltered;
  }, [userSelected]);
  const transactionId = useMemo(() => nanoid(), []);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPaymentSchema),
  });

  useEffect(() => {
    // custom error for when sender and receiver are the same
    if (!!errors[""]) {
      toast.error(errors[""]?.message?.toString());
    }
  }, [errors]);

  return (
    <Card>
      <>
        <div className="flex flex-row justify-between items-center">
          <span className="text-lg font-bold">Create Transaction</span>
          <div className="select-none cursor-pointer" onClick={onClose}>
            <XMarkIcon width={20} height={20} />
          </div>
        </div>
        {/* @ts-expect-error onSubmit will get data on the format of TCreatePaymentSchema*/}
        <form onSubmit={handleSubmit(onSubmit)} className="w-80 flex flex-col">
          <div className="flex flex-col gap-2 py-4">
            <div>
              <label
                htmlFor="transactionId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Transaction ID
              </label>
              <Input
                readOnly
                id="transactionId"
                type="text"
                placeholder="1234567890123456"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={transactionId}
                {...register("transactionId")}
              />
              {errors.transactionId?.message ? (
                <p className="text-red-500 text-sm">
                  {errors.transactionId?.message.toString()}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="sender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sender
              </label>
              <Controller
                control={control}
                name="sender"
                render={({ field: { onChange, value } }) => (
                  <Select
                    styles={selectorColourStyles}
                    options={usersOptions}
                    value={usersOptions.find((c) => c.value === value)}
                    onChange={(val) => {
                      // @ts-expect-error I need only the value from the selector
                      onChange(val.value);
                      // @ts-expect-error I need only the value from the selector
                      setUserSelected(val.value);
                    }}
                  />
                )}
              />
              {errors.sender?.message ? (
                <p className="text-red-500 text-sm">
                  {errors.sender?.message.toString()}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="receiver"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Receiver
              </label>
              <Controller
                control={control}
                name="receiver"
                render={({ field: { onChange, value } }) => (
                  <Select
                    styles={selectorColourStyles}
                    options={usersOptions}
                    value={usersOptions.find((c) => c.value === value)}
                    onChange={(val) => {
                      // @ts-expect-error I need only the value from the selector
                      onChange(val.value);
                      // @ts-expect-error I need only the value from the selector
                      setUserSelected(val.value);
                    }}
                  />
                )}
              />
              {errors.receiver?.message ? (
                <p className="text-red-500 text-sm">
                  {errors.receiver?.message.toString()}
                </p>
              ) : null}
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-full">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Amount
                </label>
                <Input
                  id="amount"
                  type="number"
                  maxLength={10000}
                  placeholder="123.00"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("amount")}
                />
                {errors.amount?.message ? (
                  <p className="text-red-500 text-sm">
                    {errors.amount?.message.toString()}
                  </p>
                ) : null}
              </div>
              <div className="w-full">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Currency
                </label>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      styles={selectorColourStyles}
                      options={currenciesForSelector}
                      value={currenciesForSelector.find(
                        (c) => c.value === value
                      )}
                      onChange={(val) => {
                        // @ts-expect-error I need only the value from the selector
                        onChange(val.value);
                      }}
                    />
                  )}
                />
                {errors.currency?.message ? (
                  <p className="text-red-500 text-sm">
                    {errors.currency?.message.toString()}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="memo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Memo
              </label>
              <Textarea
                id="memo"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("memo")}
              />
              {errors.memo?.message ? (
                <p className="text-red-500 text-sm">
                  {errors.memo?.message.toString()}
                </p>
              ) : null}
            </div>
          </div>
          <Button
            className="rounded self-center bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
            type="submit"
            disabled={onLoading}
          >
            {onLoading ? "Sending Payment..." : "Create Payment"}
          </Button>
        </form>
      </>
    </Card>
  );
};

export default CreateTransaction;
