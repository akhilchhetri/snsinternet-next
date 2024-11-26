// @ts-nocheck
import { useApp } from "@/lib/appContext";
import {
  Combobox,
  Dialog,
  Listbox,
  Transition,
  Select,
} from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import Buttons from "../UiElements/Buttons";
// import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
// import { IoIosArrowDropdownCircle } from "react-icons/io";
// import { FaCheck } from "react-icons/fa";

// import { addCustomer } from "../../api/services";
// import useAuth from "../../hooks/useAuth";

export default function AddCustomer({
  isOpen,
  setIsOpen,
  customer,
  setCustomer,
  mode,
  getPackages,
  packages,
}: {
  isOpen: any;
  setIsOpen: any;
  customer: any;
  setCustomer: (any) => void;
  mode: any;
  getPackages: () => void;
  packages: any;
}) {
  const { addNewCustomer, loadCustomers, updateCustomer } = useApp();
  const [selectedPackage, setSelectedPackage] = useState(
    packages?.length > 0 ? packages[0] : undefined,
  );
  const [query, setQuery] = useState("");
  const options = [
    { id: 1, name: "internet" },
    { id: 2, name: "cable" },
    { id: 3, name: "both" },
  ];

  const filteredPackage =
    query === ""
      ? packages
      : packages.filter((package_: any) =>
          package_.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  const [status, setStatus] = useState<string | undefined>("Active");
  const [firstName, setFirstName] = useState<string | number | undefined>(
    mode === "edit" ? customer?.firstName : undefined,
  );
  const [phoneNumber, setPhoneNumber] = useState<number | string>(
    mode === "edit" ? customer?.phoneNumber : undefined,
  );
  const [lastName, setLastName] = useState<string | undefined>(
    mode === "edit" ? customer?.lastName : undefined,
  );
  const [boxNo, setBoxNo] = useState<string | undefined>(
    mode === "edit" ? customer?.boxNo : undefined,
  );
  const [connectionType, setConnectionType] = useState<string | undefined>(
    mode === "edit" ? customer?.connectionType : options[0]?.name,
  );
  const [address, setAddress] = useState<string | undefined>(
    mode === "edit" ? customer?.address : undefined,
  );
  const [packageType, setPackage] = useState<string>("null");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (mode === "edit") {
      setFirstName(customer?.firstName);
      setLastName(customer?.lastName);
      setPhoneNumber(customer?.phoneNumber);
      setConnectionType(customer?.connectionType);
      setAddress(customer?.address);
      setBoxNo(customer?.boxNo);
    } else {
      setFirstName(undefined);
      setLastName(undefined);
      setPhoneNumber(undefined);
      setBoxNo(undefined);
      setAddress(undefined);
      setConnectionType(options[0]?.name);
    }
  }, [mode]);

  const handleSubmitCustomer = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (mode === "add") {
      let data = {
        status: status,
        firstName: firstName,
        lastName: lastName,
        boxNo: boxNo,
        connectionType: connectionType,
        phoneNumber: phoneNumber,
        address: address,
        package: selectedPackage,
      };
      const response = await addNewCustomer(data);
      if (response) {
        setFirstName(undefined);
        setLastName(undefined);
        setPhoneNumber(undefined);
        setBoxNo(undefined);
        setAddress(undefined);
        setConnectionType(options[0]?.name);
        toast.success("Customer added successfully");
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } else {
      let data = {
        status: status,
        firstName: firstName,
        lastName: lastName,
        boxNo: boxNo,
        connectionType: connectionType,
        phoneNumber: phoneNumber,
        address: address,
        package: selectedPackage,
      };
      const response = await updateCustomer(data, customer?._id);
      if (response?.success) {
        toast.success("Customer Updated Successfully");
        setCustomer(undefined);
        setFirstName(undefined);
        setLastName(undefined);
        setAddress(undefined);
        setBoxNo(undefined);
        setConnectionType(undefined);

        setTimeout(() => {
          closeModal();
        }, 3000);
      } else {
        toast.error("Error updating customer");
      }
      // if (response) {
      //   toast.success("Customer added successfully");
      //   setTimeout(() => {
      //     closeModal();
      //   }, 3000);
      // }
    }

    // getCustomers();
    setLoading(false);
  };
  const handleSelect = async (e) => {
    setConnectionType(e?.name);
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
                      {mode == "add" ? "Add New " : "Edit "} Customer &nbsp;
                      {customer?.firstName} {customer?.lastName}
                    </Dialog.Title>
                    <button onClick={() => closeModal()}>
                      <X />
                      {/* <CircleX className="size-4" /> */}
                    </button>
                  </div>
                  <div className="mt-1 rounded-sm bg-white p-1">
                    <h2 className="font-medium text-primary">{message}</h2>

                    <div className="mt-1 rounded-sm bg-white p-1">
                      {message && (
                        <h2 className="font-medium text-primary">{message}</h2>
                      )}
                      <form onSubmit={handleSubmitCustomer}>
                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            First Name
                          </label>
                          <input
                            required
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e?.target?.value)}
                            placeholder="Enter First Name"
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                          />
                        </div>
                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e?.target?.value)}
                            placeholder="Enter Last Name"
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                          />
                        </div>

                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            Phone Number
                          </label>
                          <input
                            required
                            type="number"
                            value={phoneNumber}
                            placeholder="Enter Phone Number"
                            onChange={(e) => setPhoneNumber(e?.target?.value)}
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                          />
                        </div>
                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            Box Number
                          </label>
                          <input
                            type="text"
                            defaultValue={boxNo}
                            value={boxNo}
                            placeholder="Enter Box Number"
                            onChange={(e) => setBoxNo(e?.target?.value)}
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                          />
                        </div>
                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            Connection Type
                          </label>

                          <Listbox
                            value={connectionType}
                            onChange={(e) => handleSelect(e)}
                          >
                            <Listbox.Button className="w-full rounded-md border-[1.5px] border-primary p-2 py-3 capitalize focus:border-primary active:border-primary">
                              {connectionType}
                            </Listbox.Button>
                            <Listbox.Options className="mt-2 rounded-md border-[1.5px] border-primary text-left">
                              {options.map((option) => (
                                <Listbox.Option
                                  key={option.id}
                                  value={option}
                                  className={({ active, selected }) =>
                                    `cursor-pointer p-2 capitalize ${active ? "bg-blue-500 text-white" : ""} ${
                                      selected ? "font-bold" : ""
                                    }`
                                  }
                                >
                                  {option.name}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Listbox>
                        </div>
                        <div>
                          <label className="mb-2 mt-1 block text-black dark:text-white">
                            Address
                          </label>
                          <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e?.target?.value)}
                            className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                          />
                        </div>
                        {/* {packages?.length > 0 && (
                          <div>
                            <label className="mb-2 mt-1 block text-black dark:text-white">
                              Select Package
                            </label>
                            <div className="w-full">
                              <Combobox
                                value={selectedPackage}
                                onChange={(e) => handlePackageChange(e)}
                              >
                                <div className="relative mt-1">
                                  <div className="relative w-full cursor-default overflow-hidden rounded-lg ">
                                    <Combobox.Input
                                      className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                                      displayValue={(package_) =>
                                        package_?.name
                                      }
                                      onChange={(event) =>
                                        setQuery(event.target.value)
                                      }
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                      <IoIosArrowDropdownCircle
                                        className="text-gray-400 h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </Combobox.Button>
                                  </div>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery("")}
                                  >
                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                      {filteredPackage.length === 0 &&
                                      query !== "" ? (
                                        <div className="text-gray-700 relative cursor-default select-none px-4 py-2">
                                          Nothing found.
                                        </div>
                                      ) : (
                                        filteredPackage.map((package_: any) => (
                                          <Combobox.Option
                                            key={package_.id}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                  ? "text-gray-900 bg-teal-600"
                                                  : "text-gray-900"
                                              }`
                                            }
                                            value={package_}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected
                                                      ? "font-medium"
                                                      : "font-normal"
                                                  }`}
                                                >
                                                  {package_.name}
                                                </span>
                                                {selected ? (
                                                  <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600`}
                                                  >
                                                    <FaCheck
                                                      className="h-5 w-5"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Combobox.Option>
                                        ))
                                      )}
                                    </Combobox.Options>
                                  </Transition>
                                </div>
                              </Combobox>
                            </div>
                          </div>
                        )} */}

                        <div className="mt-4 flex flex-row items-center justify-center">
                          <button
                            type="submit"
                            // onClick={(e) => handleSubmitCustomer(e)}
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
