import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToastConfig from "@/components/ToastConfig";

export const metadata: Metadata = {
  title:
    "SNS internet Admin",
  description: "SNS internet",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
