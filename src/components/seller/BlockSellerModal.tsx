import { useBlockMemberSellerMutation } from "../../services";
import { ToastType } from "../../shared/constants/common";
import { ISeller } from "../../types";
import { toast } from "../toast";
import ConfirmBlockModal from "../ui/modal/ConfirmBlockModal";

interface IBlockSellerModalProps {
  sellerDetail?: ISeller | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

export default function BlockSellerModal({
  sellerDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: IBlockSellerModalProps) {
  const blockMemberSellerMutation = useBlockMemberSellerMutation();

  const handleSellerDelete = () => {
    blockMemberSellerMutation.mutate(
      { memberId: sellerDetail?._id as string },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Delete category successfully");
          handleRefetchData();
        },
      }
    );
    closeModal();
  };

  return (
    <ConfirmBlockModal
      isOpen={isOpen}
      isLoading={blockMemberSellerMutation.isPending}
      closeModal={closeModal}
      confirmBlock={handleSellerDelete}
    />
  );
}
