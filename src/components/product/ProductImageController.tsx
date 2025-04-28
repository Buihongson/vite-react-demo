/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import ProductImage from "./ProductImage";
import { IFileWithPreview } from "../form/Dropzone";
import classNames from "classnames";

interface ProductImageControllerProps<TFieldValues extends FieldValues> {
  control: Control<any>;
  name: Path<TFieldValues>;
  label?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  maxFiles?: number;
}

const ProductImageController = <TFieldValues extends FieldValues>({
  control,
  name,
  label = "Product Images",
  required,
  containerClassName,
  labelClassName,
  maxFiles,
}: ProductImageControllerProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => (
        <div className={containerClassName}>
          {label && (
            <label
              className={classNames(
                "form-label text-neutral-700 dark:text-neutral-100",
                labelClassName
              )}
            >
              {label}
              {required && <sup className="text-red-600 ml-1">*</sup>}
            </label>
          )}
          <ProductImage
            label={label}
            initialImages={value as IFileWithPreview[]}
            onImagesChange={onChange}
            error={error?.message}
            maxFiles={maxFiles}
          />
        </div>
      )}
    />
  );
};

export default ProductImageController;
