import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Customers from "@/components/Customers/CustomersList";

export const metadata: Metadata = {
  title: "SNS Internet Admin",
  description:
    "SNS Internet Admin",
};

const CustomersPage: React.FC = () => {

  return (
    <DefaultLayout>
      <Customers />
    </DefaultLayout>
  );
};

export default CustomersPage;
