"use client";
import classnames from "classnames";
import { usePaymentsStore } from "@/store/usePaymentsStore";
import { Button } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { TCreatePaymentSchema } from "@/lib/validators/createPaymentSchema";
import { CreateTransaction } from "@/components/organisms/TransactionCard";
import { usePostPayments } from "@/hooks/usePayments";
import { IPayment } from "@/lib/types";
import { toast } from "react-toastify";
import { SearchBar } from "@/components/organisms/SearchBar";
import { useGetUsers } from "@/hooks/useUsers";
import { defaultTableSize } from "@/lib/constants";
import Select from "react-select";
import { TransactionTable } from "@/components/organisms/TransactionTable";

export default function Home() {
  const [isSendingPayment, setIsSendingPayment] = useState<boolean>(false);
  const [tableSize, setTableSize] = useState(25);

  const { livePayments, toggleLivePayments } = usePaymentsStore(
    (state) => state
  );

  const {} = useGetUsers();
  const { mutateAsync: postPayment } = usePostPayments();

  const [openNewPaymentModal, setOpenNewPaymentModal] =
    useState<boolean>(false);

  const handleSubmit = async (data: TCreatePaymentSchema) => {
    const { transactionId, sender, receiver, amount, currency, memo } = data;
    const payment: IPayment = {
      currency,
      amount: amount,
      sender: JSON.parse(sender),
      receiver: JSON.parse(receiver),
      id: transactionId,
      date: new Date().toISOString(),
      memo,
    };

    try {
      setIsSendingPayment(true);
      await postPayment(payment);
      toast.success("Payment created successfully with id: " + transactionId);
      setOpenNewPaymentModal(false);
    } catch (err: unknown) {
      // @ts-expect-error error sended from the backend
      toast.error(err.response.data.error);
    } finally {
      setIsSendingPayment(false);
    }
  };

  return (
    <div>
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      {/* Add new payment */}
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
          <div className="flex flex-row items-center gap-4">
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
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-y-scroll h-[600px]">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <TransactionTable tableSize={tableSize} />
            </div>
          </div>
          <div className="pt-4 w-96 flex flex-row gap-4 items-center">
            <span>Table Size: </span>
            <Select
              options={defaultTableSize}
              defaultValue={defaultTableSize[0]}
              isSearchable={false}
              menuPlacement="auto"
              onChange={(val) => {
                setTableSize(parseInt(val?.value as string));
              }}
            />
          </div>
        </div>
      </div>
      {/* Card display will be here */}
      {openNewPaymentModal ? (
        <div className="fixed flex flex-col items-center justify-center top-0 left-0 min-w-full min-h-full bg-slate-400/25 z-10">
          <CreateTransaction
            onSubmit={handleSubmit}
            onClose={() => setOpenNewPaymentModal(false)}
            onLoading={isSendingPayment}
          />
        </div>
      ) : null}
    </div>
  );
}
