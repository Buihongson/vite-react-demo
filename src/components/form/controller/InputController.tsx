/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Input from "../input/InputField";

interface IProps<TFieldValues extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "defaultValue" | "min" | "max" | "step"
  > {
  name: Path<TFieldValues>;
  control: Control<any>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  suffix?: string;
  containerClassName?: string;
  success?: boolean;
  hint?: string;
}

const InputController = <TFieldValues extends Record<string, unknown>>({
  name,
  type = "text",
  control,
  label,
  labelClassName,
  required,
  containerClassName,
  success,
  hint,
  ...rest
}: IProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error: fieldError } }) => (
      <div className={classNames("block", containerClassName)}>
        <label
          htmlFor={name}
          className={classNames(
            "form-label text-neutral-700 dark:text-neutral-100",
            labelClassName
          )}
        >
          {label}
          {required && <sup className="text-red-600 ml-1">*</sup>}
        </label>
        <Input
          id={name}
          type={type}
          error={!!fieldError}
          success={success}
          hint={fieldError ? fieldError.message : hint}
          placeholder={rest.placeholder || `Enter the ${label}`}
          {...field}
          {...rest}
        />
        {/* {fieldError && <div className="text-xs text-red-600 mt-2">{fieldError.message}</div>} */}
      </div>
    )}
  />
);

export default InputController;
