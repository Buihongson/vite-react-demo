/* eslint-disable @next/next/no-img-element */

"use client";

import { IProduct } from "@/types/IProduct";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

interface ProductProps {
  productInfo: IProduct;
  onClose?: () => void;
}

export default function Product({ productInfo, onClose }: ProductProps) {
  const router = useRouter();

  return (
    <div>
      <div className="border rounded-md">
        <div className="w-full h-[250px] relative flex justify-center tag_product_create">
          <img
            className="h-full object-cover"
            src="https://cdn.printway.io/lzi/6805f30040a0dbb6ce249218_800x800.jpg"
            alt="mockup"
          />
          <div className="absolute w-full opacity-0 hover:opacity-100 hover:bg-black-500/80 h-full top-0 left-0 flex items-center justify-center">
            <Button
              className="opacity-90 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-center flex-row-reverse min-w-[210px] h-10"
              onClick={() => {
                router.push("/product/public-to-store");
                onClose?.();
              }}
            >
              Start Design
            </Button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <p className="text-nature-90 font-bold text-[14px] leading-[22px]">{productInfo.name}</p>
          <p className="text-nature-70 text-[14px] leading-[22px]">{`Start from $ ${productInfo.price}`}</p>
          <div className="flex gap-[4px]"></div>
        </div>
      </div>
    </div>
  );
}
