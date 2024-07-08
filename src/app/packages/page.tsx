import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect } from "react";

const metadata: Metadata = {
  title: "SNS Internet Admin",
  description: "SNS Internet Admin",
};

const PackagesPage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>Packages</h1>
    </DefaultLayout>
  );
};

export default PackagesPage;
