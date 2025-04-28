import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ProductForm from "../../components/product/ProductForm";

export default function CreateProduct() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <PageBreadcrumb pageTitle="Create Product" />
      </div>
      <div>
        <ProductForm />
      </div>
    </div>
  );
}
