import { useDeleteBankMutation } from "../../services/bank";
import { ToastType } from "../../shared/constants/common";
import { IBank } from "../../types/IBank";
import { toast } from "../toast";
import ConfirmDeleteModal from "../ui/modal/ConfirmDeleteModal";

interface IBlockBankModalProps {
  bankDetail?: IBank | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function BlockBankModal({
  bankDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IBlockBankModalProps) {
  const deleteBankMutation = useDeleteBankMutation();

  const handleSellerDelete = () => {
    deleteBankMutation.mutate(
      { id: bankDetail?._id as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Delete bank successfully");
          handleRefetchData();
        },
      }
    );
    closeModal();
  };

  return (
    <ConfirmDeleteModal
      isOpen={isOpen}
      isLoading={deleteBankMutation.isPending}
      closeModal={closeModal}
      confirmDelete={handleSellerDelete}
    />
  );
}
