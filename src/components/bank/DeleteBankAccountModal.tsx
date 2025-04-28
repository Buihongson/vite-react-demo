import { useDeleteBankAccountMutation } from "../../services/bank";
import { ToastType } from "../../shared/constants/common";
import { IBankAccount } from "../../types/IBank";
import { toast } from "../toast";
import ConfirmDeleteModal from "../ui/modal/ConfirmDeleteModal";

interface IBlockBankModalProps {
  bankDetail?: IBankAccount | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function DeleteBankAccountModal({
  bankDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IBlockBankModalProps) {
  const deleteBankMutation = useDeleteBankAccountMutation();

  const handleBankAccountDelete = () => {
    deleteBankMutation.mutate(
      { id: bankDetail?._id as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Delete Trading Account successfully");
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
      confirmDelete={handleBankAccountDelete}
    />
  );
}
