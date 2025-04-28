"use client";

import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { PlusIcon } from "@/icons";
import { IMockupFile } from "@/types/IProduct";
import Button from "@/components/ui/button/Button";

interface IUploadMockupProps {
  mockupFile: IMockupFile | null;
  mockups: Array<IMockupFile>;
  setMockups: Dispatch<SetStateAction<Array<IMockupFile>>>;
  handleNextStep: (values: IMockupFile) => void;
}

export default function UploadMockup({
  mockupFile,
  mockups,
  setMockups,
  handleNextStep,
}: IUploadMockupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mockupSelected, setMockupSelected] = useState<IMockupFile | null>(null);

  useEffect(() => {
    if (mockupFile) {
      setMockupSelected(mockupFile);
    }
  }, [mockupFile]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = window.URL.createObjectURL(file);
      const mockupFile = { id: mockups.length + 1, file, imageUrl };

      if (!mockupSelected) {
        setMockupSelected(mockupFile);
      }

      setMockups([...mockups, mockupFile]);
    }
  };

  return (
    <div>
      <div className="mt-8 mb-10">
        <p className="text-nature-90 font-bold text-[20px] leading-[28px]">
          Custom Shape Hologram Window Decor With Hanging Piece
        </p>
      </div>
      <form>
        <div className="flex flex-col sm:flex-row gap-[40px]">
          <div>
            <Image
              src={mockupSelected?.imageUrl || "/images/default-image-300x400.svg"}
              alt="Mock"
              width={441}
              height={441}
              className="rounded max-h-[441px] object-contain"
            />
          </div>
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="flex gap-3 max-w-[530px] sm:h-[88px] flex-wrap">
              {mockups.map((item, index) => (
                <div
                  key={index}
                  className={classNames("border-2 rounded-md cursor-pointer", {
                    "border-blue-500": item.id === mockupSelected?.id,
                  })}
                  onClick={() => {
                    setMockupSelected(item);
                  }}
                >
                  <div className="relative w-[102px] h-[102px] m-1">
                    <Image
                      src={item.imageUrl}
                      alt={`Mockup-${index}`}
                      fill
                      className="rounded-md object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex items-center justify-center bg-[#42526e] min-w-[90px] h-[90px] rounded-lg ml-[10px]"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <span className="ant-upload" role="button">
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg"
                  multiple={false}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <div className="space-y-3">
                  <span className="flex justify-center items-center">
                    <PlusIcon color="white" />
                  </span>
                  <p className="text-white text-[11px] font-extralight">Add Mockup</p>
                </div>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center mt-8">
        <Button
          disabled={!mockupSelected}
          onClick={() => {
            handleNextStep(mockupSelected as IMockupFile);
          }}
        >
          Choose Variant
        </Button>
      </div>
    </div>
  );
}
