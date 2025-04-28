import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Pagination from "../../components/pagination/Pagination";
import { IQueryParams, TYPE_STATUS_SELLER } from "../../types";
import { useChangeStatusSellerMutation } from "../../services";
import { IBankAccount } from "../../types/IBank";
import { useQueryGetBankAccount } from "../../services/bank";
import BankAccountList from "../../components/bank/BankAccountList";
import DeleteBankAccountModal from "../../components/bank/DeleteBankAccountModal";
import Button from "../../components/ui/button/Button";
import { PATH_NAME } from "../../shared/constants/routes";
import { useNavigate } from "react-router";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { nanoid } from "nanoid";
import { TypeBankAccount } from "../../shared/constants/common";

export default function BankAccount() {
  const [filter, setFilter] = useState<
    IQueryParams & {
      searchKeyword?: string;
      type?: string;
    }
  >({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [bankDetail, setBankDetail] = useState<IBankAccount | null>(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusType, setStatusType] = useState("");

  const { data: bankAccounts, refetch } = useQueryGetBankAccount(filter);
  const changeStatusSellerMutation = useChangeStatusSellerMutation();

  const handleEditSeller = (status: string, data: IBankAccount) => {
    changeStatusSellerMutation.mutate({
      id: data?._id,
      status: status as TYPE_STATUS_SELLER,
    });
    setBankDetail(data);
  };

  const handleDeleteBank = (data: IBankAccount) => {
    setBankDetail(data);
    setIsOpenDeleteModal(true);
  };

  const handleRefetchData = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setIsOpenDeleteModal(false);
    setBankDetail(null);
  };

  const handleFilterSelectType = (e: string) => {
    setStatusType(e);
  };
  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Trading Account" />
          <Button
            onClick={() => {
              navigate(PATH_NAME.CreateBankAccount);
            }}
          >
            Create Trading Account
          </Button>
        </div>
        <div className="mb-5 flex items-end gap-2 flex-wrap">
          <Input
            placeholder="Search"
            value={searchText}
            className="!w-fit"
            onChange={(e) => setSearchText(e?.target?.value)}
          />
          <Select
            key={nanoid()}
            defaultValue={statusType}
            options={TypeBankAccount}
            placeholder="Select type"
            onChange={(e: string) => {
              handleFilterSelectType(e);
            }}
            className="dark:bg-dark-900 !w-[120px] !p-0 !text-center"
          />
          <Button
            size="sm"
            onClick={() => {
              setSearchText("");
              setStatusType("");
              setFilter({
                pageIndex: 0,
                pageSize: 10,
              });
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setFilter({
                ...filter,
                type: statusType,
                searchKeyword: searchText,
              });
            }}
          >
            Search
          </Button>
        </div>
        <div>
          <BankAccountList
            bankAccounts={bankAccounts?.data || []}
            handleEditBank={handleEditSeller}
            handleDeleteBank={handleDeleteBank}
          />
          <div className="flex justify-end">
            {!isEmpty(bankAccounts?.data) && (
              <Pagination
                page={bankAccounts?.pagination?.page as number}
                pageLength={bankAccounts?.pagination?.pageSize as number}
                totalRecords={bankAccounts?.pagination?.count as number}
                onPageChange={(page, pageLength) => {
                  setFilter({
                    ...filter,
                    pageSize: pageLength,
                    pageIndex: page - 1,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      <DeleteBankAccountModal
        isOpen={isOpenDeleteModal}
        bankDetail={bankDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
    </>
  );
}
