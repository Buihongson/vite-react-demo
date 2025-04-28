import React from "react";
import type { Metadata } from "next";
import Balance from "@/components/dashboard/Balance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TopUp from "@/components/finance/TopUp";

export const metadata: Metadata = {
  title: "Wallet | Fulfillment System",
};

export default function WalletPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="wallet" />
      <TopUp />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <Balance />
        </div>
      </div>
    </div>
  );
}
