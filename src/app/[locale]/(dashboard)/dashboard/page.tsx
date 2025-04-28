import React from "react";
import type { Metadata } from "next";
import Balance from "@/components/dashboard/Balance";

export const metadata: Metadata = {
  title: "Dashboard | Fulfillment System",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <Balance />
      </div>
    </div>
  );
}
