// lib/AuthContext.js
// @ts-nocheck
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useLocalStorage from "@/hooks/useLocalStorage";
const AppContext = createContext();
export function AppProvider({ children }) {
  const [customers, setCustomers] = useState(undefined)
  const [customerLoading, setCustomerLoading] = useState(undefined)
  const [customer, setCustomer] = useState(undefined)
  const [modal, closeModal] = useState(false);
  const [mode, setMode] = useState(undefined)
  const [customerPayments, setCustomerPayments] = useState(undefined)
  const [paymentLoading, setPaymentLoading]= useState(false)
  const [searchText, setSearchText]= useState(undefined)
  const [searching, setSearching] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true);
  // const [authToken, setAuthToken] = useState(
  //   localStorage.getItem("token") || null,
  // );
  const [authToken, setAuthToken] = useLocalStorage('token', undefined)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
//   useEffect(()=>{
//     loadCustomers()
//   },[])
  const loadCustomers = async()=>{
     try {
       setCustomerLoading(true)
       const response = await axios.get("/api/customers");
       if(response?.data?.data){
        setCustomers(response?.data?.data)
        setCustomerLoading(false)
       }
     } catch (error) {
       toast.error(error?.response?.data?.error || "Error occured");
       if (error?.response?.data?.type === "expired"){
        setCustomers(undefined)
        setAuthToken(undefined)
       }
       setCustomerLoading(false);
       setCustomers(undefined)
     }
  }
  const loadEachCustomer = async (id)=>{
    setCustomerLoading(true);
    try{
      const response = await axios.get(`/api/customers/${id}`)
      if(response?.data?.data){
        setCustomer(response?.data?.data)
      }else{
        setCustomer(undefined)
      }
      setCustomerLoading(false)
    }catch(error){
      toast.error(error?.response?.data?.error || "Error occured");
       if (error?.response?.data?.type === "expired") {
         setCustomer(undefined);
        setAuthToken(undefined);
       }
       setCustomerLoading(false);
    }
  }

  // loading customer payments
  const loadCustomerPayments = async(id)=>{
    setPaymentLoading(true)
    try{
      setPaymentLoading(false)
      const response = await axios.get(`/api/payments/?customerId=${id}`)
      if(response?.data?.data){
        setCustomerPayments(response?.data?.data)
      }
    }catch(error){
      setPaymentLoading(false)
      toast.error(error?.response?.data?.error || "Error occured");
      if (error?.response?.data?.type === "expired") {
        setAuthToken(undefined);
      }
    }
  }
  const addCustomerPayment = async(data, id) =>{
     try {
       const response = await axios.post(`/api/payments/?customerId=${id}`, {data});
       if (response?.data?.data) {
        await loadCustomerPayments(id)
        return response?.data
       }
     } catch (error) {
       toast.error(error?.response?.data?.error || "Error occured");
       if (error?.response?.data?.type === "expired") {
         setAuthToken(undefined);
       }
     }
  }
  const updateCustomerPayment = async(data, cid)=>{
    try {
      const response = await axios.patch(`/api/payments/?customerId=${cid}`, {
        data,
      });
      if (response?.data?.data) {
        return response?.data;
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error occured");
      if (error?.response?.data?.type === "expired") {
        setAuthToken(undefined);
      }
    }
  }

  const deletePayment = async(data) =>{
    try{
      toast.success("Deleting payment")
      setDeleting(true)
      const response = await axios.delete(`/api/payments/?paymentId=${data?._id}`, {
        data,
      });
      if (response?.data?.success) {
        setDeleting(false);
        loadCustomerPayments(data?.customer)
        toast.success("Success")  
      }      
    }catch(error){
      setDeleting(false);
      toast.error(error?.response?.data?.error || "Error occured");
      if (error?.response?.data?.type === "expired") {
        setAuthToken(undefined);
      }
    }
  }

  // detect search mode
  useEffect(()=>{
    if(searchText?.length>0 && customers?.length>0){
      setSearching(true)
      const result = searchCustomersByName(customers, searchText)
      setCustomers(result)
      setTimeout(()=>{
        setSearching(false);
      },500)
    }else{
      loadCustomers()
      setSearching(false)
    }
  },[searchText])

  function searchCustomersByName(customers, searchTerm) {
    // if (!searchTerm) {
    //   return [];
    // }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return customers.filter((customer) => {
      let customer_name =
        customer?.firstName?.toLowerCase() +
        " " +
        customer?.lastName?.toLowerCase()
      // const firstNameMatch = customer.firstName
      //   .toLowerCase()
      //   .includes(lowerCaseSearchTerm);
      // const lastNameMatch = customer.lastName
      //   .toLowerCase()
      //   .includes(lowerCaseSearchTerm);
      // return firstNameMatch || lastNameMatch;
      return customer_name.includes(lowerCaseSearchTerm);
    });
  }
  return (
    <AppContext.Provider
      value={{
        customers, setCustomers, customerLoading, setCustomerLoading, customer, setCustomer, modal, closeModal, mode, setMode, authToken, setAuthToken, loadCustomers, loadEachCustomer, loadCustomerPayments, customerPayments, addCustomerPayment, updateCustomerPayment, setSearchText, searchText, searching, deletePayment, deleting
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function  useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

