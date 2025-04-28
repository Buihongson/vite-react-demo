import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTrans } from "@/hooks/useTrans";
import InputController from "../form/controller/InputController";
import Button from "../ui/button/Button";
import { useVerifyAccountMutation } from "@/services";
import { toast } from "../toast";
import { ToastType } from "@/constants/common";
import Link from "next/link";

interface IVerifyFormProps {
  emailRegister: string;
}

type FormValues = {
  code: string;
};

const VerifyForm: React.FC<IVerifyFormProps> = ({ emailRegister }) => {
  const { t, locale } = useTrans();
  const verifyAccountMutation = useVerifyAccountMutation();

  const schema = yup.object().shape({
    code: yup.string().required(t("errors.required")),
  });

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    verifyAccountMutation.mutate(
      { ...values, email: emailRegister },
      {
        onSuccess: () => {
          toast(ToastType.Success, t("auth.verificationSuccess"));

          window.location.href = `/${locale}/login`;
        },
      }
    );
  };

  return (
    <div>
      <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
        {t("auth.enterCode")}
      </h1>
      <span className="inline-block text-palette-mute dark:text-white/90 text-[12px] font-normal text-sm">
        {t("auth.sentTo")} {emailRegister}
      </span>
      <form className="mt-2">
        <div className="flex flex-col gap-6">
          <InputController
            control={control}
            name="code"
            label={t("auth.verificationCode")}
            required
          />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Button onClick={handleSubmit(onSubmit)}>{t("auth.verify")}</Button>
        </div>
      </form>
      <div className="mt-5">
        <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          <Link
            href={`/${locale}/login`}
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            {t("auth.loginWithDifferentEmail")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyForm;
