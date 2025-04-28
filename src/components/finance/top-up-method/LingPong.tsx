import UsdtRate from "../UsdtRate";
import { IBankAccount } from "@/types";
import { useTrans } from "@/hooks/useTrans";

interface ILingPongProps {
  usdtRate: number;
  lingPongInfo: IBankAccount;
}

export default function LingPong({ usdtRate, lingPongInfo }: Readonly<ILingPongProps>) {
  const { t } = useTrans();

  return (
    <div>
      <UsdtRate usdtRate={usdtRate} />
      <div className="mt-4 px-2 text-sm">
        <div className="text-neutral-700 dark:text-neutral-200">
          LingPong Email:{" "}
          <span className="font-semibold dark:text-white">{lingPongInfo?.accountNo}</span>
        </div>
        <div className="text-neutral-700 dark:text-neutral-200">
          {t("common.transferContent")}: <span className="font-semibold dark:text-white"></span>
        </div>
      </div>
    </div>
  );
}
