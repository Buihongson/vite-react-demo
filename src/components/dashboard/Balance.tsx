"use client";

import React from "react";
import { FaWallet, FaLock, FaCreditCard } from "react-icons/fa6";
import { useTrans } from "@/hooks/useTrans";
import commonEn from "@/locales/en/common.json";
import { TranslationKey } from "@/utils/i18n";
import { useQueryGetProfile } from "@/services";

type CardData = {
  icon: React.ReactNode;
  labelKey: keyof typeof commonEn.common;
  value: string;
  valueClass: string;
};

const cardData: CardData[] = [
  {
    icon: <FaWallet className="text-gray-800 size-6 dark:text-white/90" />,
    labelKey: "balance",
    value: "3,782",
    valueClass: "text-red-600",
  },
  {
    icon: <FaWallet className="text-gray-800 size-6 dark:text-white/90" />,
    labelKey: "available",
    value: "3,782",
    valueClass: "text-red-600",
  },
  {
    icon: <FaLock className="text-gray-800 size-6 dark:text-white/90" />,
    labelKey: "hold",
    value: "3,782",
    valueClass: "text-gray-800 dark:text-white/90",
  },
  {
    icon: <FaCreditCard className="text-gray-800 size-6 dark:text-white/90" />,
    labelKey: "credit",
    value: "3,782",
    valueClass: "text-green-700",
  },
];

export default function Balance() {
  const { t } = useTrans();

  const { data: profileData } = useQueryGetProfile();
  console.log("🚀 ~ Balance ~ profileData:", profileData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {cardData.map((card) => (
        <div
          key={String(card.labelKey)}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              {card.icon}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t(`common.${String(card.labelKey)}` as TranslationKey)}
            </div>
          </div>
          <div className="flex items-end justify-end mt-5">
            <h4 className={`mt-2 font-bold text-title-sm ${card.valueClass}`}>{card.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
