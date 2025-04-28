import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Pagination from "../../components/pagination/Pagination";
import { IQueryParams, TYPE_STATUS_SELLER } from "../../types";
import { useChangeStatusSellerMutation } from "../../services";
import BankList from "../../components/bank/BankList";
import { useQueryGetBanks } from "../../services/bank";
import { IBank } from "../../types/IBank";
import BlockBankModal from "../../components/bank/DeleteBankModal";

export default function Bank() {
  const [filter, setFilter] = useState<IQueryParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [bankDetail, setBankDetail] = useState<IBank | null>(null);

  const { data: banks, refetch } = useQueryGetBanks(filter);
  const changeStatusSellerMutation = useChangeStatusSellerMutation();

  const handleEditSeller = (status: string, data: IBank) => {
    changeStatusSellerMutation.mutate({
      id: data?._id,
      status: status as TYPE_STATUS_SELLER,
    });
    setBankDetail(data);
  };

  const handleDeleteBank = (data: IBank) => {
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

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Bank " />
          {/* <Button
            onClick={() => {
              navigate(PATH_NAME.CreateSeller);
            }}
          >
            Create Seller
          </Button> */}
        </div>
        <div>
          <BankList
            banks={banks?.data || []}
            handleEditBank={handleEditSeller}
            handleDeleteBank={handleDeleteBank}
          />
          <div className="flex justify-end">
            {!isEmpty(banks?.data) && (
              <Pagination
                page={banks?.pagination?.page as number}
                pageLength={banks?.pagination?.pageSize as number}
                totalRecords={banks?.pagination?.count as number}
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
      <BlockBankModal
        isOpen={isOpenDeleteModal}
        bankDetail={bankDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
    </>
  );
}
