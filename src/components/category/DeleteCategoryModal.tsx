import { useDeleteCategoryMutation } from "../../services/category";
import { ToastType } from "../../shared/constants/common";
import { ICategory } from "../../types";
import { toast } from "../toast";
import ConfirmDeleteModal from "../ui/modal/ConfirmDeleteModal";

interface IDeleteCategoryModalProps {
  categoryDetail?: ICategory | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function DeleteCategoryModal({
  categoryDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IDeleteCategoryModalProps) {
  const deleteCategoryMutation = useDeleteCategoryMutation();

  const handleDeleteCategory = () => {
    deleteCategoryMutation.mutate(
      { id: categoryDetail?._id as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Delete category successfully");
          handleRefetchData();
          closeModal();
        },
      }
    );
  };

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      isLoading={deleteCategoryMutation.isPending}
      closeModal={closeModal}
      confirmDelete={handleDeleteCategory}
    />
  );
}
