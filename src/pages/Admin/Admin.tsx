import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import Pagination from "../../components/pagination/Pagination";
import { User, IQueryParams } from "../../types";
import { useQueryGetAdmins, useResetAdminMutation } from "../../services";
import AdminList from "../../components/admin/AdminList";
import DeleteAdminModal from "../../components/admin/DeleteAdminModal";
import AdminForm from "../../components/admin/AdminForm";
import { toast } from "../../components/toast";

export default function Admin() {
  const [filter, setFilter] = useState<IQueryParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [categoryDetail, setCategoryDetail] = useState<User | null>(null);

  const { data: admins, refetch } = useQueryGetAdmins(filter);
  const resetAdminMutation = useResetAdminMutation();

  const handleEditCategory = (data: User) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to reset this account password?"
    );
    if (!confirmDelete) {
      return;
    }
    resetAdminMutation.mutate(
      {
        id: data?._id,
      },
      {
        onSuccess: () => {
          toast("success", "Reset Password Admin Account Success");
        },
      }
    );
    setCategoryDetail(data);
  };

  const handleDeleteCategory = (data: User) => {
    setCategoryDetail(data);
    setIsOpenDeleteModal(true);
  };

  const handleRefetchData = () => {
    refetch();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsOpenDeleteModal(false);
    setCategoryDetail(null);
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <PageBreadcrumb pageTitle="Admin" />
          <Button
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Create Admin
          </Button>
        </div>
        <div>
          <AdminList
            admins={admins?.data || []}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
          <div className="flex justify-end">
            {!isEmpty(admins?.data) && (
              <Pagination
                page={admins?.pagination?.page as number}
                pageLength={admins?.pagination?.pageSize as number}
                totalRecords={admins?.pagination?.count as number}
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
      <AdminForm
        isOpen={isOpenModal}
        categoryDetail={categoryDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
      <DeleteAdminModal
        isOpen={isOpenDeleteModal}
        categoryDetail={categoryDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
    </>
  );
}
