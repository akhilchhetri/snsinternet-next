// @ts-nocheck
import Link from "next/link";
import moment from "moment";
// import { RiAddCircleFill } from "react-icons/ri";
import { CirclePlusIcon } from "lucide-react";

const CustomersTable = ({
  customers,
    setCustomer,
    setModal,
    setMode,
}: {
  customers: any;
    setCustomer: (d: any) => void;
    setModal: (d: boolean) => void;
    setMode: (d: string) => void;
}) => {
  const handleAddPayment = (data: any) => {
    setModal(true);
    setCustomer(data);
    setMode("add");
  };
  
  return (
    <div className="w-full rounded-lg border border-stroke pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="bg-red-500 flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-7">
          <div className="col-span-1 hidden max-w-[20px] p-1">
            <h6 className="text-xsm font-medium xsm:text-base">ID</h6>
          </div>
          <div className="p-1 text-left xl:p-2">
            <h6 className="text-[12px] font-medium md:text-[15px]">Name</h6>
          </div>
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] font-medium md:text-[15px] ">Type</h6>
          </div>
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Box. No
            </h6>
          </div>
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Address
            </h6>
          </div>
          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Phone
            </h6>
          </div>
          <div className="hidden p-1 text-center md:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Joined Date
            </h6>
          </div>
          <div className="p-1 text-center sm:block xl:p-2">
            <h6 className="text-[12px] text-sm font-medium md:text-[15px] ">
              Actions
            </h6>
          </div>
        </div>
        {customers.map((each: any, index: any) => {
          let date = each?.joinDate;
          const dateMoment = moment(date);

          return (
            <div
              key={index}
              className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 md:grid-cols-7"
            >
              <div className="hidden items-center gap-0 p-0 md:gap-3 md:p-1 xl:p-2">
                <p className="text-[12px] text-black dark:text-white md:text-[16px]">
                  {each?._id}
                </p>
              </div>
              <div className="flex items-center gap-0 p-0 text-center md:gap-3 md:p-1 xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.firstName} {each?.lastName}
                </p>
              </div>

              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.connectionType}
                </p>
              </div>

              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.boxNo}
                </p>
              </div>

              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.address}
                </p>
              </div>
              <div className="items-center justify-center p-1 sm:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {each?.phoneNumber}
                </p>
              </div>
              <div className="hidden items-center justify-center p-1 md:flex xl:p-2">
                <p className=" text-[12px] text-black dark:text-white sm:block md:text-[16px]">
                  {dateMoment?.year()}- {dateMoment?.month()} -{" "}
                  {dateMoment?.day()}
                </p>
              </div>

              <div className="items-center justify-center p-1 sm:flex xl:p-2">
                <div className="flex flex-col items-center justify-center gap-[2px] md:gap-1">
                  <Link href={`/customers/${each?._id}`}>
                    <button className="rounded bg-white px-1 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                      View Detail
                    </button>
                  </Link>
                  <button
                    onClick={() => handleAddPayment(each)}
                    className="flex flex-row items-center justify-center gap-[0.2px] rounded bg-white px-1 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
                  >
                    <CirclePlusIcon className="mr-[2px] size-2 md:size-3" />
                    Add Payment
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

export default CustomersTable;
