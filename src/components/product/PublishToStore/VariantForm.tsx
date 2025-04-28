"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { IMockupFile, IVariant } from "@/types/IProduct";
import Button from "@/components/ui/button/Button";
import CheckboxController from "@/components/form/controller/CheckboxController";
import InputController from "@/components/form/controller/InputController";

const OptionsMock = [
  {
    label: "Style",
    values: [
      {
        name: "1 LAYERED",
        aliasName: "",
        _id: "68028f3850ab4212363e7099",
      },
    ],
    optionName: "VN Products Style",
    id: "642d56fa3d90dada1456ce32",
    _id: "68028f3850ab4212363e7098",
  },
  {
    label: "Size",
    values: [
      {
        name: "8X8 INCHES",
        aliasName: "",
        _id: "68028f3850ab4212363e709b",
      },
      {
        name: "6X8 INCHES",
        aliasName: "",
        _id: "68028f3850ab4212363e709c",
      },
    ],
    optionName: "VN Products Size",
    id: "642d593a3d90dada14570c04",
    _id: "68028f3850ab4212363e709a",
  },
  {
    label: "Title",
    values: [
      {
        name: "ONE SIDE",
        aliasName: "",
        _id: "68028f3850ab4212363e709e",
      },
      {
        name: "TWO SIDES",
        aliasName: "",
        _id: "68028f3850ab4212363e709f",
      },
    ],
    optionName: "VN Products Title",
    id: "642d57523d90dada1456ceaf",
    _id: "68028f3850ab4212363e709d",
  },
];

interface IVariantFormProps {
  mockupFile: IMockupFile;
  variantInfo: IVariant | null;
  handleNextStep: (values: IVariant) => void;
}

export default function VariantForm({
  variantInfo,
  mockupFile,
  handleNextStep,
}: IVariantFormProps) {
  const formMethods = useForm<IVariant>({
    // resolver: yupResolver(validationSchema),
    defaultValues: {},
  });
  const { fields, append } = useFieldArray({
    control: formMethods.control,
    name: "prices",
  });

  useEffect(() => {
    if (variantInfo) {
      formMethods.reset({ ...variantInfo });
    }
  }, [variantInfo]);

  const handleOptionChange = () => {
    // const watchValues = formMethods.watch();

    append({ regular: "", sale: " " });
  };

  const onSubmit = (values: IVariant) => {
    handleNextStep(values);
  };

  const createOptions = () =>
    OptionsMock.map((item, index) => {
      return (
        <div key={index} className="mb-2">
          <label className="form-label font-bold text-neutral-700 dark:text-neutral-100">
            {item.label}
            <sup className="text-red-600 ml-1">*</sup>
          </label>
          <div className="flex gap-4 mt-1">
            {item.values.map(({ ...inputProps }) => (
              <CheckboxController
                {...inputProps}
                control={formMethods.control}
                key={inputProps.name}
                label={inputProps.name}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        </div>
      );
    });

  return (
    <div>
      <div className="mt-8 mb-10">
        <p className="text-nature-90 font-bold text-[20px] leading-[28px]">
          Custom Shape Hologram Window Decor With Hanging Piece
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-[40px]">
        <div className="min-w-[250px]">
          <Image
            src={mockupFile?.imageUrl || "/images/default-image-300x400.svg"}
            alt="Mock"
            width={250}
            height={250}
            className="rounded max-h-[250px] object-cover"
          />
        </div>
        <FormProvider {...formMethods}>
          <form className="w-full">
            <section className="flex-1 flex flex-col gap-3">{createOptions()}</section>
            <section>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <InputController
                    control={formMethods.control}
                    name={`price.${index}.regular`}
                    label="Regular"
                    labelClassName="font-bold"
                    containerClassName="mb-2 w-full"
                    required
                  />
                  <InputController
                    control={formMethods.control}
                    name={`price.${index}.sale`}
                    label="Sale"
                    labelClassName="font-bold"
                    containerClassName="mb-2 w-full"
                    required
                  />
                </div>
              ))}
            </section>
          </form>
        </FormProvider>
      </div>
      <div className="flex items-center justify-center mt-8">
        <Button onClick={formMethods.handleSubmit(onSubmit)}>Add description</Button>
      </div>
    </div>
  );
}
