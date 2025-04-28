"use client";

import { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Tabs, { TabItem } from "../ui/tabs/Tabs";
import { useTrans } from "@/hooks/useTrans";
import { useQueryGetBankAccount, useQueryGetUSDTRate } from "@/services";
import BankVietNam from "./top-up-method/BankVietNam";
import Payoneer from "./top-up-method/Payoneer";
import { getBankAccountByType } from "@/utils/helpers";
import { BankAccountType } from "@/constants/common";
import LingPong from "./top-up-method/LingPong";
import LianLian from "./top-up-method/LianLian";

export default function TopUp() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTrans();

  const { data: bankAccountData } = useQueryGetBankAccount();
  const { data: usdtRateData } = useQueryGetUSDTRate();

  const tabItems: TabItem[] = [
    {
      key: BankAccountType.Bank,
      label: "common.bankVietNam",
      content: <BankVietNam usdtRate={usdtRateData?.data.bid as number} />,
    },
    {
      key: BankAccountType.Payoneer,
      label: "common.payoneer",
      content: (
        <Payoneer
          usdtRate={usdtRateData?.data.bid as number}
          payoneerInfo={
            getBankAccountByType(bankAccountData?.data || [], BankAccountType.Payoneer)!
          }
        />
      ),
    },
    {
      key: BankAccountType.PingPong,
      label: "common.pingPong",
      content: (
        <LingPong
          usdtRate={usdtRateData?.data.bid as number}
          lingPongInfo={
            getBankAccountByType(bankAccountData?.data || [], BankAccountType.Payoneer)!
          }
        />
      ),
    },
    {
      key: BankAccountType.LianLian,
      label: "common.lianLian",
      content: (
        <LianLian
          usdtRate={usdtRateData?.data.bid as number}
          lianLianInfo={
            getBankAccountByType(bankAccountData?.data || [], BankAccountType.Payoneer)!
          }
        />
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {t("common.topUp")}
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        className="max-w-[700px] m-4 !p-6"
        isBackdropClose={false}
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {t("common.topUp")}
            </h4>
          </div>
          <div className="space-y-6">
            <div className="py-3 border-t border-gray-200 dark:border-gray-800">
              <Tabs items={tabItems} defaultActiveKey={BankAccountType.Bank} />
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {t("common.cancel")}
            </Button>
            {/* <Button size="sm">{t("common.check")}</Button> */}
          </div>
        </div>
      </Modal>
    </>
  );
}
