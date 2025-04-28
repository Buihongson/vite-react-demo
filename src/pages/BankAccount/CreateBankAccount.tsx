import { useParams } from "react-router";
import AccountBankForm from "../../components/bank/AccountBankForm";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function CreateBankAccount() {
  const { id } = useParams();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <PageBreadcrumb
          pageTitle={`${id ? "Update" : "Create"} Trading Account`}
        />
      </div>
      <div>
        <AccountBankForm />
      </div>
    </div>
  );
}
