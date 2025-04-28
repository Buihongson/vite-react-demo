"use client";

import { useForm } from "react-hook-form";
import InputController from "@/components/form/controller/InputController";
import { IVariant } from "@/types/IProduct";
import EditorController from "@/components/form/controller/EditorController";
import Button from "@/components/ui/button/Button";

interface IDescriptionFormProps {
  variantInfo: IVariant | null;
}

export default function DescriptionForm(variantInfo: IDescriptionFormProps) {
  console.log("🚀 ~ DescriptionForm ~ variantInfo:", variantInfo);
  const { control } = useForm();

  return (
    <div>
      <div className="mt-8 mb-10">
        <p className="text-nature-90 font-bold text-[20px] leading-[28px]">
          Custom Shape Hologram Window Decor With Hanging Piece
        </p>
      </div>
      <div className="flex gap-4">
        <form className="border border-[#DFE1E6] rounded-lg w-full p-8">
          <h3 className="text-[#091E42] text-base font-bold pb-4">Add product type info</h3>
          <div>
            <InputController control={control} name="name" label="Name" required />
            <EditorController
              control={control}
              name="description"
              label="Description"
              required
              containerClassName="mt-2"
            />
          </div>
        </form>
        <div className="flex flex-col gap-4 w-[300px] min-w-[300px]">
          <div className="border border-[#DFE1E6] rounded-[8px] p-4 text-[14px] leading-[22px]">
            <p className="text-nature-90 font-bold pb-[16px]">
              Store<span className="text-red-600">*</span>
            </p>
            <div>Content</div>
          </div>
          <div className="border border-[#DFE1E6] rounded-[8px] p-4 text-[14px] leading-[22px]"></div>
          <div className="flex items-center justify-center">
            <Button className="w-full">Publish now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
