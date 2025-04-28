/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, Control, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../ui/button/Button";
import { IOptionSchema } from "../../types/IProduct";
import InputController from "../form/controller/InputController";
import { IOptionSelect } from "../../types";
import SelectController from "../form/controller/SelectController";
import {
  useCreateBankMutation,
  useQueryGetBankDetail,
  useQueryGetBanks,
  useUpdateBankAccMutation,
} from "../../services/bank";
import {
  bankAccountNotBankSchema,
  bankAccountSchema,
} from "../../shared/constants/validation";
import { TypeBankAccount } from "../../shared/constants/common";
import { toast } from "../toast";
import { useNavigate, useParams } from "react-router";
import useGoBack from "../../hooks/useGoBack";
import { useQueryClient } from "@tanstack/react-query";

export type ProductTypeOption = IOptionSelect & {
  optionSchema: Array<IOptionSchema>;
};

export default function AccountBankForm() {
  const { id } = useParams();
  const [banksOption, setBanksOption] = useState<Array<IOptionSelect>>([]);
  const [typeAcc, setTypeAcc] = useState<string>();
  const { data: banks } = useQueryGetBanks({});
  const { data: bankDetail } = useQueryGetBankDetail(id as string, {
    enabled: !!id,
  });
  const createBankMutation = useCreateBankMutation();
  const updateBankAccMutation = useUpdateBankAccMutation();
  const navigate = useNavigate();
  const goback = useGoBack();
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: {
      accountName: "",
      accountNo: "",
      bank: undefined,
    },
    resolver: yupResolver(
      typeAcc === "bank" ? bankAccountSchema : bankAccountNotBankSchema
    ),
    mode: "onChange",
  });
  const { control, reset, handleSubmit } = methods;

  useEffect(() => {
    if (banks?.data) {
      setBanksOption(
        banks.data.map((item) => ({
          label: item.name,
          value: item.bin.toString(),
        }))
      );
    }
  }, [banks?.data]);

  useEffect(() => {
    if (bankDetail?.data) {
      setTypeAcc(bankDetail?.data?.type);
      const typeAcc = TypeBankAccount?.find(
        (option) => option.value === bankDetail?.data?.type
      );
      if (bankDetail?.data?.bank && banksOption.length > 0) {
        const selectedType = banksOption.find(
          (option) => option.label === bankDetail?.data?.bank
        );
        if (selectedType) {
          reset({
            accountName: bankDetail?.data?.accountName,
            accountNo: bankDetail?.data?.accountNo,
            bank: selectedType,
            type: typeAcc,
          });
          return;
        }
      }
      reset({
        accountName: bankDetail?.data?.accountName,
        accountNo: bankDetail?.data?.accountNo,
        type: typeAcc,
        bank: undefined,
      });
    }
  }, [bankDetail?.data, banksOption]);

  const onSubmit = (values: any) => {
    if (id) {
      updateBankAccMutation.mutate(
        {
          ...values,
          bank: values?.bank?.label,
          type: values?.type?.value,
          acqId: Number(values?.bank?.value),
          bankId: id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["GET_BANK_DETAIL"] });
            queryClient.invalidateQueries({ queryKey: ["GET_BANK_ACCOUNT"] });
            reset({
              bank: undefined,
              type: undefined,
              accountName: "",
              accountNo: "",
            });
            toast("success", "Update Trading Account Success");
            goback();
          },
        }
      );
      return;
    }
    createBankMutation.mutate(
      {
        ...values,
        bank: values?.bank?.label,
        type: values?.type?.value,
        acqId: Number(values?.bank?.value),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["GET_BANK_ACCOUNT"] });
          reset();
          toast("success", "Create Trading Account Success");
          goback();
        },
      }
    );
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-6">
      <FormProvider {...methods}>
        <form className="flex flex-col">
          <div className="px-2 custom-scrollbar">
            <SelectController
              control={control as unknown as Control<Record<string, unknown>>}
              name="type"
              label="Type Account Bank"
              options={TypeBankAccount}
              onChange={(e) => {
                reset();
                setTypeAcc(e?.value);
              }}
              isDisabled={!!id}
              required
              containerClassName="mb-3"
            />
            {typeAcc === "bank" && (
              <>
                <SelectController
                  control={
                    control as unknown as Control<Record<string, unknown>>
                  }
                  name="bank"
                  label="Bank"
                  options={banksOption}
                  required
                  containerClassName="mb-3"
                />
                <InputController
                  control={control}
                  label="Account Name"
                  name="accountName"
                  required
                  containerClassName="mb-3"
                />
              </>
            )}
            <InputController
              control={control}
              name="accountNo"
              label="Account No"
              required
              containerClassName="mb-3"
            />
            <div id="variants" />
          </div>
        </form>
      </FormProvider>
      <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate("/bank-account")}
        >
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </div>
  );
}
