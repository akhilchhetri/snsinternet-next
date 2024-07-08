'use client'
import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Customers from "@/components/Customers/CustomersList";
import EachCustomer from "@/components/Customers/EachCustomer";
import { useParams } from "next/navigation";


const CustomerPage: React.FC = () => {
  const params = useParams()
  return (
    <DefaultLayout>
      <EachCustomer id={params?.id}/>
    </DefaultLayout>
  );
};

export default CustomerPage;
