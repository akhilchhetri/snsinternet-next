// @ts-nocheck
// import { Link } from "react-router-dom";
import Link from "next/link";
// import usePackages from "../hooks/usePackages";
import moment from "moment";
import { PlusCircleIcon, Trash2 } from "lucide-react";

const PaymentsTable = ({
  payments,
  setModal,
  setPayment,
  setMode,
  selectedYear,
  deletePayment,
  deleting,
}: {
  payments: any;
  setPayment: (d: any) => void;
  setModal: (d: boolean) => void;
  setMode: (d: string) => void;
  deletePayment: (d: any) => void;
  selectedYear: any;
  deleting: boolean;
}) => {
  const handleEditPayment = (data: any) => {
    setModal(true);
    setPayment(data);
    setMode("edit");
  };
  const handleDeletePayment = (data: any) => {
    deletePayment(data);
  };
  return (
    <div className="w-full rounded-sm border border-stroke px-2 pb-2.5 pt-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 md:px-5 md:pt-6 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {!selectedYear ? "All " : ""}Payments{" "}
        {selectedYear ? "For " + selectedYear : ""}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-7">
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] font-medium md:text-[15px]">Date</h6>
          </div>
          <div className="p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] font-medium md:text-[15px] ">Amount</h6>
          </div>
          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Due
            </h6>
          </div>
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Payment Title
            </h6>
          </div>
          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Bill Miti
            </h6>
          </div>
          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Remarks
            </h6>
          </div>

          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Actions
            </h6>
          </div>
        </div>
        {payments.map((each: any, key: number) => {
          let date = each?.joinDate;
          const dateMoment = moment(date);
          return (
            <div
              key={key}
              className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-7"
            >
              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                {each?.date ? (
                  <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                    {each?.date}
                  </p>
                ) : (
                  <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                    {each?.year}-{each?.month}-{each?.day}
                  </p>
                )}
              </div>
              <div className="flex flex-row items-center justify-center">
                <p className=" text-center text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.amount}
                </p>
              </div>

              <div className="flex flex-row items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.due}
                </p>
              </div>

              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.paymentTitle}
                </p>
              </div>
              <div className="flex items-center justify-center p-1 xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.billDate}
                </p>
              </div>

              <div className="flex flex-row items-center justify-center p-1 sm:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.remarks}
                </p>
              </div>

              <div className="items-center justify-center p-1 sm:flex xl:p-2">
                <div className="flex flex-col justify-center gap-[2px] md:flex-row md:items-center md:gap-1">
                  <button
                    onClick={() => handleEditPayment(each)}
                    className="flex flex-row items-center justify-center gap-[0.2px] rounded bg-white px-2 py-2 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
                  >
                    Edit
                  </button>
                  <button
                    disabled={deleting}
                    onClick={() => handleDeletePayment(each)}
                    className="flex flex-row items-center justify-center gap-[0.2px] rounded bg-white px-2 py-2 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
                  >
                    <Trash2 className="size-3 text-red" />
                    <span className="ml-[1px] text-red">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentsTable;
