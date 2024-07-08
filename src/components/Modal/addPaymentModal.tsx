// @ts-nocheck
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CircleX } from "lucide-react";
// import { RxCross2 } from "react-icons/rx";
// import Buttons from "../UiElements/Buttons";
// import { Link } from "react-router-dom";
// import {}
import { SyncLoader } from "react-spinners";
// import { addCustomerPayment, updateCustomerPayment } from "../../api/services";
// import usePayments from "../../hooks/usePayments";
import { useApp } from "@/lib/appContext";
import { toast } from "react-toastify";

export default function AddPaymentModal({
  isOpen,
  setIsOpen,
  customer,
  mode,
  payment,
}: {
  isOpen: any;
  setIsOpen: any;
  customer: any;
  mode: any;
  payment: any;
}) {
  const { loadCustomerPayments, addCustomerPayment, updateCustomerPayment } =
    useApp();

  const [date, setDate] = useState<string | undefined>(
    mode === "edit" ? payment?.date : undefined,
  );
  const [amount, setAmount] = useState<string | number | undefined>(
    mode === "edit" ? payment?.amount : undefined,
  );
  const [title, setTitle] = useState<string | undefined>(
    mode === "edit" ? payment?.paymentTitle : undefined,
  );
  const [remarks, setRemarks] = useState<string | undefined>(
    mode === "edit" ? payment?.remarks : undefined,
  );
  const [due, setDue] = useState<string | number | undefined>(
    mode === "edit" ? payment?.due : undefined,
  );
  const [billDate, setBillDate] = useState<string | undefined>(
    mode === "edit" ? payment?.billDate : undefined,
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  function closeModal() {
    setIsOpen(false);
    setMessage("")
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleSubmitPayment = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (mode === "add") {
      if (customer?._id) {
        let data = {
          date: date,
          amount: amount,
          paymentTitle: title,
          remarks: remarks,
          customer: customer?._id,
          billDate: billDate,
          due: due,
        };
        const response = await addCustomerPayment(data, customer?._id);
        if (response?.success) {
          toast.success("Payment added successfully");
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
        setLoading(false);
      }
    } else {
      if (customer?._id) {
        let data = {
          date: date || payment?.date,
          amount: amount,
          paymentTitle: title,
          remarks: remarks,
          billDate: billDate,
          customer: customer?._id,
          due: due,
          payment_id: payment?._id,
        };
        const response = await updateCustomerPayment(data, customer?._id);
        if (response) {
          setMessage("Payment Updated successfully");
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
        setLoading(false);
        loadCustomerPayments(customer?._id);
      }
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 w-[100vw] overflow-y-auto bg-black-2 bg-opacity-50">
            <div className="mx-auto flex min-h-full items-center justify-center overflow-y-scroll p-0 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:max-w-[50vw]">
                  <div className="flex flex-row items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-black"
                    >
                      {mode == "add" ? "Add" : "Edit"} Payment for{" "}
                      {customer?.firstName} {customer?.lastName}
                    </Dialog.Title>
                    <button onClick={() => closeModal()}>
                      <CircleX className="size-4" />
                    </button>
                  </div>
                  <div className="mt-1 rounded-sm bg-white p-1">
                    <h2 className="font-medium text-primary">{message}</h2>
                    <form onSubmit={handleSubmitPayment}>
                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Date
                        </label>
                        <div className="relative">
                          <input
                            required
                            type="date"
                            value={mode === "edit" ? payment?.date : date}
                            onChange={(e) => setDate(e?.target?.value)}
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Amount
                        </label>
                        <input
                          required
                          type="number"
                          defaultValue={
                            mode === "edit" ? payment?.amount : amount
                          }
                          onChange={(e) => setAmount(e?.target?.value)}
                          placeholder="Enter Amount"
                          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                        />
                      </div>
                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Payment Title
                        </label>
                        <input
                          required
                          type="text"
                          defaultValue={
                            mode === "edit" ? payment?.paymentTitle : title
                          }
                          onChange={(e) => setTitle(e?.target?.value)}
                          placeholder="Enter Payment Title"
                          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                        />
                      </div>

                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Remarks
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            mode === "edit" ? payment?.remarks : remarks
                          }
                          placeholder="Remarks"
                          onChange={(e) => setRemarks(e?.target?.value)}
                          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                        />
                      </div>
                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Bill Miti
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            mode === "edit" ? payment?.billDate : billDate
                          }
                          placeholder="Bill Date"
                          onChange={(e) => setBillDate(e?.target?.value)}
                          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                        />
                      </div>
                      <div>
                        <label className="mb-2 mt-1 block text-black dark:text-white">
                          Due
                        </label>
                        <input
                          type="number"
                          defaultValue={mode === "edit" ? payment?.due : due}
                          placeholder="Enter Due Amount"
                          onChange={(e) => setDue(e?.target?.value)}
                          className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                        />
                      </div>
                      <div className="mt-4 flex flex-row items-center justify-center">
                        <button
                          disabled={loading}
                          type="submit"
                          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                          {loading ? (
                            <SyncLoader color="#FFF" size={"12"} />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
