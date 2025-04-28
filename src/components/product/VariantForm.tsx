import { useFieldArray, useFormContext } from "react-hook-form";
import { FaRegCircleXmark } from "react-icons/fa6";
import InputController from "../form/controller/InputController";
import ProductImageController from "./ProductImageController";
import { IProduct } from "../../types";
import Button from "../ui/button/Button";
import { ProductTypeOption } from "./ProductForm";

interface IVariantFormProps {
  selectedProductType: ProductTypeOption;
}

export default function VariantForm({
  selectedProductType,
}: IVariantFormProps) {
  console.log("🚀 ~ selectedProductType:", selectedProductType)
  const methods = useFormContext<IProduct>();
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "variants",
  });
  console.log("🚀 ~ fields:", fields)

  const handleAppendField = () => {
    const variantsOption: Record<string, string> = {};
    selectedProductType.optionSchema.forEach((item) => {
      variantsOption[item.name] = "";
    });

    append({
      optionValues: { ...variantsOption },
      price: { base: 0, profit: 0, sale: 0 },
      quantity: 0,
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
    });
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-md p-3 mb-3">
      {fields.map((field, indexField) => (
        <div
          className="border border-dashed rounded-md p-3 mb-3 relative"
          key={field.id}
        >
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(field.optionValues).map((item, index) => (
              <div key={index} className="mb-3">
                <InputController
                  control={control}
                  name={`variants.[${indexField}].optionValues.${item}`}
                  label={item}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="form-label text-neutral-700 dark:text-neutral-100">
              Price
              <sup className="text-red-600 ml-1">*</sup>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <InputController
                control={control}
                name={`variants.[${indexField}].price.base`}
                label="Base"
                labelClassName="text-sm"
                required
              />
              <InputController
                control={control}
                name={`variants.[${indexField}].price.profit`}
                label="Profit"
                labelClassName="text-sm"
              />
              <InputController
                control={control}
                name={`variants.[${indexField}].price.sale`}
                label="Sale"
                labelClassName="text-sm"
              />
            </div>
          </div>
          <InputController
            control={control}
            name={`variants.[${indexField}].quantity`}
            label="Quantity"
            labelClassName="text-sm"
            containerClassName="mb-3"
            required
          />
          <InputController
            control={control}
            name={`variants.[${indexField}].weight`}
            label="Weight"
            labelClassName="text-sm"
            containerClassName="mb-3"
            required
          />
          <div className="mb-3">
            <label className="form-label text-neutral-700 dark:text-neutral-100">
              Dimensions
              <sup className="text-red-600 ml-1">*</sup>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <InputController
                control={control}
                name={`variants.[${indexField}].dimensions.length`}
                label="Length"
                labelClassName="text-sm"
                required
              />
              <InputController
                control={control}
                name={`variants.[${indexField}].dimensions.width`}
                label="Width"
                labelClassName="text-sm"
                required
              />
              <InputController
                control={control}
                name={`variants.[${indexField}].dimensions.height`}
                label="Height"
                labelClassName="text-sm"
                required
              />
            </div>
          </div>
          <ProductImageController
            control={control}
            name={`variants.[${indexField}].image`}
            label="Image"
            required
            containerClassName="mb-3"
            maxFiles={1}
          />
          <button
            className="text-red-500 absolute right-[-8px] top-[-8px]"
            onClick={() => {
              remove(indexField);
            }}
          >
            <FaRegCircleXmark size={16} />
          </button>
        </div>
      ))}
      <div className="flex items-end justify-end">
        <Button
          type="button"
          className="!min-h-[34px] !h-[34px] !px-[10px]"
          onClick={handleAppendField}
        >
          Add variant
        </Button>
      </div>
    </div>
  );
}
