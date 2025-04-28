import { useDeleteAdminMutation } from "../../services";
import { ToastType } from "../../shared/constants/common";
import { User } from "../../types";
import { toast } from "../toast";
import ConfirmDeleteModal from "../ui/modal/ConfirmDeleteModal";

interface IDeleteCategoryModalProps {
  categoryDetail?: User | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function DeleteAdminModal({
  categoryDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IDeleteCategoryModalProps) {
  const deleteAdminMutation = useDeleteAdminMutation();

  const handleDeleteAdmin = () => {
    deleteAdminMutation.mutate(
      { id: categoryDetail?._id as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Delete admin successfully");
          handleRefetchData();
          closeModal();
        },
      }
    );
  };

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      isLoading={deleteAdminMutation.isPending}
      closeModal={closeModal}
      confirmDelete={handleDeleteAdmin}
    />
  );
}
