import React from "react";
import type { Metadata } from "next";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PublishToStore from "@/components/product/PublishToStore/PublishToStore";

export const metadata: Metadata = {
  title: "Publish to Store | Fulfillment System",
};

export default function PublishToStorePage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <PageBreadcrumb pageTitle="Publish to Store" />
      </div>
      <div>
        <PublishToStore />
      </div>
    </div>
  );
}
