import { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router";
import CategoryList from "../../components/category/CategoryList";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Button from "../../components/ui/button/Button";
import CategoryFrom from "../../components/category/CategoryForm";
import Pagination from "../../components/pagination/Pagination";
import { ICategory, IQueryParams } from "../../types";
import DeleteCategoryModal from "../../components/category/DeleteCategoryModal";
import { PATH_NAME } from "../../shared/constants/routes";
import { useQueryGetProducts } from "../../services";

export default function Product() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<IQueryParams>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [categoryDetail, setCategoryDetail] = useState<ICategory | null>(null);

  const { data: categoriesData, refetch } = useQueryGetProducts(filter);

  const handleEditCategory = (data: ICategory) => {
    setCategoryDetail(data);
    setIsOpenModal(true);
  };

  const handleDeleteCategory = (data: ICategory) => {
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
          <PageBreadcrumb pageTitle="Product" />
          <Button
            onClick={() => {
              navigate(PATH_NAME.CreateProduct);
            }}
          >
            Create Product
          </Button>
        </div>
        <div>
          <CategoryList
            categories={categoriesData?.data || []}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
          <div className="flex justify-end">
            {!isEmpty(categoriesData?.data) && (
              <Pagination
                page={categoriesData?.pagination?.page as number}
                pageLength={categoriesData?.pagination?.pageSize as number}
                totalRecords={categoriesData?.pagination?.count as number}
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
      <CategoryFrom
        isOpen={isOpenModal}
        categoryDetail={categoryDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
      <DeleteCategoryModal
        isOpen={isOpenDeleteModal}
        categoryDetail={categoryDetail}
        handleRefetchData={handleRefetchData}
        closeModal={handleCloseModal}
      />
    </>
  );
}
