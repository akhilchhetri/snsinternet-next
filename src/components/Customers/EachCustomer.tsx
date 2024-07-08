// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useApp } from "@/lib/appContext";
import CardOne from "../Card/CardOne";
import CardTwo from "../Card/CardTwo";
import CardThree from "../Card/CardThree";
import CardFour from "../Card/CardFour";
import PaymentsTable from "./PaymentsTable";
import AddPaymentModal from "../Modal/addPaymentModal";
let currentYear = new Date()?.getFullYear()?.toString();
let yearList: string[] = ["2019", "2020", "2021", "2022", "2023", "2024"];

if (!yearList?.includes(currentYear)) {
  yearList = [...yearList, currentYear];
}
const EachCustomer = ({ id }) => {
  const {
    customer,
    setCustomer,
    customerLoading,
    loadEachCustomer,
    loadCustomerPayments,
    customerPayments,
    deletePayment,
    deleting
  } = useApp();
  useEffect(() => {
    if (id) {
      loadEachCustomer(id);
      loadCustomerPayments(id);
    }
  }, [id]);
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());
  const [payment, setPayment] = useState<any | undefined>(undefined);
  const [mode, setMode] = useState("add");
  const [filteredPayments, setFilteredPayments] = useState<any>([]);
  //   const { id } = useParams();
  //   const { customerPayments } = usePayments(id);
  //   let { packages } = usePackages();
  const [modal, closeModal] = useState(false);
  // const [addCustomerModal, closeAddCustomerModal] = useState(false);

  const filterCustomerPayments = (year: any) => {
    if (year && customerPayments) {
      let filtered: any = [];
      customerPayments?.map((each: any) => {
        if (each?.date) {
          let date = each?.date?.split("-");
          let temp = date[0];
          if (temp == year) {
            filtered.push(each);
          }
        }
        if (each?.year) {
          if (year == each?.year) {
            filtered.push(each);
          }
        }
      });
      setFilteredPayments(filtered);
    }
  };
  useEffect(() => {
    if (selectedYear) {
      filterCustomerPayments(selectedYear);
    }
  }, [selectedYear, customerPayments]);
  return (
    <>
      <Breadcrumb pageName="Customer" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne customer={customer} />
        <CardTwo customer={customer} />

        {customerPayments?.length > 0 && (
          <>
            <CardThree payments={customerPayments} />
            <CardFour payments={customerPayments} />
          </>
        )}
      </div>
      <div className="min-h-[100vh]">
        <>
          <button
            type="submit"
            onClick={() => {
              closeModal(true);
              setMode("add");
            }}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-8 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add Payment
          </button>
          <div>
            <h1 className="mt-4 font-bold text-black">Filter By Year</h1>
            {yearList?.map((each: any, key: any) => (
              <button
                key={key}
                type="submit"
                onClick={() => setSelectedYear(each)}
                className={`mr-4 mt-4 inline-flex items-center justify-center rounded-md  px-2 py-2 text-center font-medium  hover:bg-opacity-90 ${each == selectedYear ? "bg-primary text-white" : "bg-slate-200 text-black"}`}
              >
                {each}
              </button>
            ))}
          </div>
          <AddPaymentModal
            isOpen={modal}
            setIsOpen={closeModal}
            customer={customer}
            mode={mode}
            payment={payment}
          />
          {selectedYear ? (
            <div className="mt-5 flex flex-row bg-white">
              {filteredPayments?.length > 0 ? (
                <PaymentsTable
                  payments={filteredPayments}
                  setPayment={setPayment}
                  setModal={closeModal}
                  setMode={setMode}
                  selectedYear={selectedYear}
                  deletePayment={deletePayment}
                  deleting={deleting}
                />
              ) : (
                <h1>No payments for in {selectedYear}</h1>
              )}
            </div>
          ) : (
            <div className="mt-5 flex flex-row bg-white">
              {customerPayments?.length > 0 ? (
                <PaymentsTable
                  payments={customerPayments}
                  setPayment={setPayment}
                  setModal={closeModal}
                  setMode={setMode}
                  selectedYear={selectedYear}
                />
              ) : (
                <h1>Loading customer payments</h1>
              )}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default EachCustomer;
