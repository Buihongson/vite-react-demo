import React from "react";
import type { Metadata } from "next";
import Filter from "@/components/product/Filter";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import AllProduct from "@/components/product/AllProduct";
import CreateProduct from "@/components/product/CreateProduct";

export const metadata: Metadata = {
  title: "Products | Fulfillment System",
};

export default function AllProductPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <PageBreadcrumb pageTitle="My Product" />
        <CreateProduct />
      </div>
      <Filter />
      {/* <div>
        <AllProduct />
      </div> */}
    </div>
  );
}
