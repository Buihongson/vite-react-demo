import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Pagination from "../../components/pagination/Pagination";
import { IQueryParams, ISeller, TYPE_STATUS_SELLER } from "../../types";
import {
  useChangeStatusSellerMutation,
  useQueryGetSellers,
} from "../../services";
import SellerList from "../../components/seller/SellerList";
import BlockSellerModal from "../../components/seller/BlockSellerModal";
import { toast } from "../../components/toast";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

export default function Seller() {
  const [filter, setFilter] = useState<
    IQueryParams & {
      searchKeyword?: string;
    }
  >({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [sellerDetail, setSellerDetail] = useState<ISeller | null>(null);
  const [searchText, setSearchText] = useState("");

  const { data: sellers, refetch } = useQueryGetSellers(filter);
  const changeStatusSellerMutation = useChangeStatusSellerMutation();

  const handleEditSeller = (status: string, data: ISeller) => {
    changeStatusSellerMutation.mutate(
      {
        id: data?._id,
        status: status as TYPE_STATUS_SELLER,
      },
      {
        onSuccess: () => {
          toast("success", "Change Status Seller Success");
        },
      }
    );
    setSellerDetail(data);
  };

  const handleDeleteSeller = (data: ISeller) => {
    setSellerDetail(data);
    setIsOpenDeleteModal(true);
  };

  const handleRefetchData = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setIsOpenDeleteModal(false);
    setSellerDetail(null);
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Seller" />
          {/* <Button
            onClick={() => {
              navigate(PATH_NAME.CreateSeller);
            }}
          >
            Create Seller
          </Button> */}
        </div>
        <div className="mb-5 flex items-center gap-2">
          <Input
            value={searchText}
            className="!w-fit"
            onChange={(e) => setSearchText(e?.target?.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              setSearchText("");
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
                searchKeyword: searchText,
              });
            }}
          >
            Search
          </Button>
        </div>
        <div>
          <SellerList
            categories={sellers?.data || []}
            handleEditSeller={handleEditSeller}
            handleDeleteSeller={handleDeleteSeller}
          />
          <div className="flex justify-end">
            {!isEmpty(sellers?.data) && (
              <Pagination
                page={sellers?.pagination?.page as number}
                pageLength={sellers?.pagination?.pageSize as number}
                totalRecords={sellers?.pagination?.count as number}
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
      <BlockSellerModal
        isOpen={isOpenDeleteModal}
        sellerDetail={sellerDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
    </>
  );
}
