import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { ICategory } from "../../types/ICategory";
import InputController from "../form/controller/InputController";
import TextAreaController from "../form/controller/TextAreaController";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/category";
import { toast } from "../toast";
import { ToastType } from "../../shared/constants/common";

interface ICategoryFromProps {
  categoryDetail?: ICategory | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Please enter title"),
});

export default function CategoryFrom({
  categoryDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: ICategoryFromProps) {
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  const { control, reset, handleSubmit } = useForm<ICategory>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (categoryDetail) {
      reset({
        title: categoryDetail.title,
        description: categoryDetail.description,
      });
    }
  }, [categoryDetail]);

  const onSubmit = (values: ICategory) => {
    if (categoryDetail?._id) {
      updateCategoryMutation.mutate(
        { ...values, id: categoryDetail._id },
        {
          onSuccess: () => {
            toast(ToastType.Success, "Update category successfully");
            handleRefetchData();
            closeModal();
          },
        }
      );
      return;
    }

    createCategoryMutation.mutate(
      { ...values },
      {
        onSuccess: () => {
          toast(ToastType.Success, "Create category successfully");
          handleRefetchData();
          closeModal();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[700px] m-4"
      isBackdropClose={false}
    >
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {categoryDetail ? "Edit category" : "Create category"}
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <InputController
              control={control}
              name="title"
              label="Title"
              required
              containerClassName="mb-3"
            />
            <TextAreaController
              control={control}
              name="description"
              label="Description"
              required
            />
          </div>
        </form>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
