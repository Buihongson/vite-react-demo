import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import InputController from "../form/controller/InputController";
import { toast } from "../toast";
import { Role, ToastType } from "../../shared/constants/common";
import SelectController from "../form/controller/SelectController";
import { PayloadAdmin, User } from "../../types";
import { useCreateAdminMutation } from "../../services";

interface ICategoryFromProps {
  categoryDetail?: User | null;
  isOpen: boolean;
  closeModal: () => void;
  handleRefetchData: () => void;
}

const schema = yup.object().shape({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
  role: yup
    .object()
    .shape({
      label: yup.string().ensure().required(),
      value: yup.string().ensure().required(),
    })
    .required("Please select role"),
});

export default function AdminForm({
  categoryDetail,
  isOpen,
  closeModal,
  handleRefetchData,
}: ICategoryFromProps) {
  const createAdminMutation = useCreateAdminMutation();

  const { control, reset, handleSubmit } = useForm<
    Pick<PayloadAdmin, "username" | "password"> & {
      role: {
        label: string;
        value: string;
      };
    }
  >({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (categoryDetail) {
      reset({
        username: categoryDetail.username,
      });
    }
  }, [categoryDetail]);

  const onSubmit = (
    values: Pick<User, "username"> & {
      password: string;
      role: {
        label: string;
        value: string;
      };
    }
  ) => {
    // if (categoryDetail?._id) {
    //   updateCategoryMutation.mutate(
    //     { ...values, id: categoryDetail._id },
    //     {
    //       onSuccess: () => {
    //         toast(ToastType.Success, "Update category successfully");
    //         handleRefetchData();
    //         closeModal();
    //       },
    //     }
    //   );
    //   return;
    // }

    createAdminMutation.mutate(
      {
        ...values,
        role: values?.role?.value as "admin" | "seller" | "manager",
      },
      {
        onSuccess: () => {
          reset();
          toast(ToastType.Success, "Create admin successfully");
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
      <div className="relative w-full p-4 bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {categoryDetail ? "Edit admin" : "Create admin"}
          </h4>
        </div>
        <form className="flex flex-col">
          <div className="px-2 custom-scrollbar">
            <InputController
              control={control}
              name="username"
              label="Username"
              required
              containerClassName="mb-3"
            />
            <InputController
              type="password"
              control={control}
              name="password"
              label="Password"
              required
              containerClassName="mb-3"
            />
            <SelectController
              control={control}
              name="role"
              label="Role"
              options={(Object.keys(Role) as Array<keyof typeof Role>).map(
                (item) => ({
                  label: item,
                  value: Role[item],
                })
              )}
              required
              containerClassName="mb-3 z-[1000]"
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
