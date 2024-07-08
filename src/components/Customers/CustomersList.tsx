// @ts-nocheck
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useApp } from "@/lib/appContext";
import CustomersTable from "./CustomersTable";
import { BarLoader, CircleLoader } from "react-spinners";

const Customers: React.FC = () => {
  // @ts-nocheck
  const {
    customers,
    setCustomers,
    loadCustomers,
    setSearchText,
    searchText,
    searching,
  } = useApp();
  useEffect(() => {
    loadCustomers();
  }, []);
  return (
    <>
      <CustomerSearch setSearchText={setSearchText} />
      {searchText ? (
        <div className="px-5 py-2">
          {searching ? (
            <span>
              Searching Search Result for:{" "}
              <span className="font-[600]">{searchText}</span>
            </span>
          ) : (
            <span>
              Showing Search Result for:{" "}
              <span className="font-[600]">{searchText}</span>
            </span>
          )}
        </div>
      ) : (
        ""
      )}
      <Breadcrumb pageName="Customers" />
      <div className="min-h-[100vh]">
        {customers?.length > 0 ? (
          <CustomersTable
            customers={customers}
            // setCustomer={setCustomer}
            // setModal={closeModal}
            // setMode={setMode}
          />
        ) : (
          <div className="flex h-full w-full flex-row items-center justify-center">
            <h1>Loading customers</h1>
          </div>
        )}
      </div>
    </>
  );
};

const CustomerSearch = ({ setSearchText }) => {
  return (
    <div className="h-[50px] w-full">
      <form className="mb-10 w-full">
        <div className="relative w-full">
          <button className="absolute right-0 top-1/2 flex h-full w-[20%] -translate-y-1/2 flex-row items-center justify-center rounded-lg bg-slate-500 md:w-[7%]">
            <svg
              className="fill-black hover:fill-primary dark:fill-black dark:hover:fill-primary"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
            <span className="text-[14px] text-black-2">Search</span>
          </button>

          <input
            type="text"
            placeholder="Search customers"
            onChange={(e) => setSearchText(e?.target?.value)}
            className="w-full rounded-lg bg-slate-300 py-3 pl-5 pr-4 font-medium focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

export default Customers;
