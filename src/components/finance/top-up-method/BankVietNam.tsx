import { useForm } from "react-hook-form";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import NumericInputController from "@/components/form/controller/NumericInputController";
import UsdtRate from "../UsdtRate";
import Button from "@/components/ui/button/Button";
import { useCreateQRCodeMutation } from "@/services";
import { IBankAccount, ITransaction } from "@/types";
import { useTrans } from "@/hooks/useTrans";

type FormValues = {
  amount: string;
};

interface IBankVietNam {
  usdtRate: number;
}

export default function BankVietNam({ usdtRate }: Readonly<IBankVietNam>) {
  const { t } = useTrans();
  const [bankInfo, setBankInfo] = useState<{
    bank: IBankAccount;
    transaction: ITransaction;
  } | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);

  const createQRCodeMutation = useCreateQRCodeMutation();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    createQRCodeMutation.mutate(
      {
        amount: Number(values.amount),
        type: "bank",
        currency: "USD",
      },
      {
        onSuccess: (response) => {
          setBankInfo({ bank: response.data.bank, transaction: response.data.transaction });
          setQRCode(response.data.qrCode);
        },
      }
    );
  };

  return (
    <div>
      <UsdtRate usdtRate={usdtRate} />
      <form className="my-4 flex items-end gap-3">
        <NumericInputController
          control={control}
          name="amount"
          label={t("common.amount")}
          required
          containerClassName="flex-1"
        />

        <Button className="!h-[44px]" onClick={handleSubmit(onSubmit)}>
          {t("common.createQR")}
        </Button>
      </form>
      {qrCode && (
        <div className="flex gap-4">
          <div className="border rounded bg-white p-3">
            <QRCodeSVG value={qrCode} />
          </div>
          <div className="text-sm mt-4">
            <div className="text-neutral-700 dark:text-neutral-200">
              {t("common.bank")}:{" "}
              <span className="font-semibold dark:text-white">{bankInfo?.bank?.bank}</span>
            </div>
            <div className="text-neutral-700 dark:text-neutral-200">
              {t("common.accountNumber")}:{" "}
              <span className="font-semibold dark:text-white">{bankInfo?.bank?.accountNo}</span>
            </div>
            <div className="text-neutral-700 dark:text-neutral-200">
              {t("common.accountName")}:{" "}
              <span className="font-semibold dark:text-white">{bankInfo?.bank?.accountName}</span>
            </div>
            <div className="text-neutral-700 dark:text-neutral-200">
              {t("common.transferContent")}: <span className="font-semibold dark:text-white"></span>
            </div>
            <div className="text-neutral-700 dark:text-neutral-200">
              {t("common.amountVND")}:{" "}
              <span className="font-semibold dark:text-white">
                {bankInfo?.transaction?.amountVND}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
