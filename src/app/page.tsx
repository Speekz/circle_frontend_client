"use client";
import classnames from "classnames";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { Button } from "@headlessui/react";
import TransactionTable from "@/components/organisms/TransactionTable/TransactionTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CreateTransaction from "@/components/organisms/TransactionCard/CreateTransaction";

export default function Home() {
  const [openNewPaymentModal, setOpenNewPaymentModal] =
    useState<boolean>(false);

  const { livePayments, toggleLivePayments } = usePaymentsStore(
    (state) => state
  );

  const handleSubmit = () => {
    setOpenNewPaymentModal(!openNewPaymentModal);
  };

  return (
    <div>
      <div className="flex">
        <Button
          className="group fixed bottom-5 right-5 rounded-full bg-indigo-600 text-sm h-10 w-10 text-white font-bold data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700 z-10"
          onClick={() => setOpenNewPaymentModal(!openNewPaymentModal)}
        >
          <span className="invisible absolute rounded shadow-lg py-1 px-2 bg-slate-700 -mx-32 -my-10 text-white group-hover:visible group-hover:z-50">
            Add new Payment
          </span>
          <PlusIcon width={25} height={25} className="m-auto" />
        </Button>
      </div>
      {/* Transaction Table with action buttons */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="flex flex-row justify-between items-center">
            <div>
              {livePayments ? (
                <span>
                  Data is being fetched{" "}
                  <span className="text-red-500 font-bold">LIVE</span>
                </span>
              ) : (
                <span>
                  Data fetching is on{" "}
                  <span className="text-indigo-500 font-bold">PAUSE</span>
                </span>
              )}
            </div>
            <Button
              className={classnames(
                "rounded py-2 px-4 text-sm text-white w-24 font-bold",
                livePayments
                  ? "bg-red-600 data-[hover]:bg-red-500 data-[active]:bg-red-700"
                  : "bg-indigo-600 data-[hover]:bg-indigo-500 data-[active]:bg-indigo-700"
              )}
              onClick={toggleLivePayments}
            >
              {livePayments ? "LIVE" : "PAUSED"}
            </Button>
          </div>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
      {/* Card display will be here */}
      {openNewPaymentModal ? (
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-screen h-screen bg-slate-400/25 z-10">
          <CreateTransaction onSubmit={handleSubmit} />
        </div>
      ) : null}
    </div>
  );
}
