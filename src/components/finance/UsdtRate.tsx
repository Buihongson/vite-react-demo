import { FaArrowsLeftRight } from "react-icons/fa6";

interface IUsdtRate {
  usdtRate: number;
}

export default function UsdtRate({ usdtRate }: IUsdtRate) {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-300 text-sm">
      Min top up <span className="text-red-500">$1</span>
      <FaArrowsLeftRight />
      <span className="text-red-500">{usdtRate.toFixed(0)}</span>
      <div className="flex items-center gap-3 text-gray-600">
        {`(Rate: $1`} <FaArrowsLeftRight /> {`${usdtRate.toFixed(0)})`}
      </div>
    </div>
  );
}
