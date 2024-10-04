"use client";

import { currenciesForSelector } from "@/lib/constants";
import { selectorColourStyles } from "@/lib/styles/selector";
import {
  filterPaymentsSchema,
  TFilterPaymentsSchema,
} from "@/lib/validators/filterPaymentsSchema";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { useUsersStore } from "@/store/useUsersStore";
import { Button, Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const searchBarDefaults = {
  transactionId: "",
  user: null,
  currency: null,
  minAmount: "",
  maxAmount: "",
  memo: "",
};

const SearchBar = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const {
    control,
    reset,
    resetField,
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: searchBarDefaults,
    resolver: zodResolver(filterPaymentsSchema),
  });

  const { getUsersForSelector } = useUsersStore((state) => state);
  const { setFilters } = usePaymentsStore((state) => state);

  const usersOptions = getUsersForSelector();

  const handleToggleAdvancedSearch = () => {
    resetField("minAmount");
    resetField("maxAmount");
    resetField("memo");
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  const onSubmit = (data: TFilterPaymentsSchema) => {
    setFilters(data);
  };

  const handleReset = () => {
    setFilters(null);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="transactionId"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Transaction ID
          </label>
          <Input
            id="transactionId"
            type="text"
            placeholder="1234567890123456"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("transactionId")}
          />
        </div>
        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            User
          </label>
          <Controller
            control={control}
            name="user"
            render={({ field: { onChange, value } }) => (
              <Select
                styles={selectorColourStyles}
                options={usersOptions}
                value={
                  value !== null
                    ? usersOptions.find((c) => c.value === value)
                    : null
                }
                onChange={(val) => {
                  // @ts-expect-error I need only the value from the selector
                  onChange(val.value);
                }}
                placeholder="Select a User..."
              />
            )}
          />
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
                value={
                  value !== null
                    ? currenciesForSelector.find((c) => c.value === value)
                    : null
                }
                onChange={(val) => {
                  // @ts-expect-error I need only the value from the selector
                  onChange(val.value);
                }}
                placeholder="Select a currency..."
              />
            )}
          />
        </div>
        {isAdvancedSearch ? (
          <>
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <label
                  htmlFor="minAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Minimun Amount
                </label>
                <Input
                  id="minAmount"
                  type="number"
                  maxLength={10000}
                  placeholder="123.00"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("minAmount")}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="maxAmount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Maximum Amount
                </label>
                <Input
                  id="maxAmount"
                  type="number"
                  maxLength={10000}
                  placeholder="123.00"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("maxAmount")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="memo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Memo includes
              </label>
              <Input
                id="memo"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("memo")}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="flex flex-row justify-between items-center pt-4">
        <Button
          className="text-indigo-500"
          onClick={handleToggleAdvancedSearch}
        >
          {!isAdvancedSearch ? "Open Advanced Search" : "Close Advanced Search"}
        </Button>
        <div className="flex flex-row gap-4">
          <Button
            className="rounded self-center bg-slate-600 py-2 px-4 text-sm text-white data-[hover]:bg-slate-500 data-[active]:bg-slate-700"
            type="reset"
            onClick={handleReset}
          >
            Reset filters
          </Button>
          <Button
            type="submit"
            className="rounded self-center bg-indigo-600 py-2 px-4 text-sm text-white data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
