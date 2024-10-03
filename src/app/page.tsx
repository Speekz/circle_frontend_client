"use client";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { Button } from "@headlessui/react";
import TransactionTable from "@/components/organisms/TransactionTable/TransactionTable";
import classnames from "classnames";

export default function Home() {
  const { livePayments, toggleLivePayments } = usePaymentsStore(
    (state) => state
  );

  return (
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
                <span className="text-blue-500 font-bold">PAUSE</span>
              </span>
            )}
          </div>
          <Button
            className={classnames(
              "rounded py-2 px-4 text-sm text-white w-24 font-bold",
              livePayments
                ? "bg-red-600 data-[hover]:bg-red-500 data-[active]:bg-red-700"
                : "bg-sky-600 data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
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
  );
}
