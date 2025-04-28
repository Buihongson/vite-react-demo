import React, { ReactNode } from "react";
import { Control, Controller, Path, FieldValues } from "react-hook-form";
import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { NumericFormatProps } from "react-number-format/types/types";

interface INumericInputProps<TFieldValues extends FieldValues> extends NumericFormatProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  customClass?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  rightIcon?: ReactNode;
  rightIconClassName?: string;
  onRightIconClick?: () => void;
}

// eslint-disable-next-line react/display-name
const NumberFormatInput = React.forwardRef(({ ...rest }: FieldValues, ref) => {
  return <NumericFormat {...rest} getInputRef={ref} autoComplete="off" />;
});

const NumericInputController = <TFieldValues extends Record<string, unknown>>({
  control,
  name,
  customClass,
  containerClassName,
  labelClassName,
  label,
  required,
  rightIcon,
  rightIconClassName,
  onChange,
  onBlur,
  onRightIconClick,
  ...rest
}: INumericInputProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { ref, ...field }, fieldState: { error } }) => {
      return (
        <div className={classNames("block", containerClassName)}>
          <label
            htmlFor={name}
            className={classNames(
              "form-label text-neutral-700 dark:text-neutral-100 text-sm",
              labelClassName
            )}
          >
            {label}
            {required && <sup className="text-red-600 ml-1">*</sup>}
          </label>
          <div className="relative">
            <NumberFormatInput
              {...rest}
              {...field}
              ref={ref}
              name={name}
              className={classNames(
                "form-control text-gray-800 border-gray-300 focus:border-brand-300 h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ",
                customClass,
                {
                  invalid: error?.message,
                }
              )}
              value={Number(field.value) > 0 ? +field.value : field.value || ""}
              onChange={(event: React.FocusEvent<HTMLInputElement>) => {
                field.onChange(event);
                onChange?.(event);
              }}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                field.onBlur();
                onBlur?.(event);
              }}
            />
            {rightIcon && (
              <span
                className={classNames(
                  "absolute top-[40%] right-[14px] d-flex align-items-center justify-content-center tx-color-04",
                  rightIconClassName
                )}
                onClick={() => onRightIconClick?.()}
              >
                {rightIcon}
              </span>
            )}
          </div>
          {error?.message && <p className="text-xs text-red-600 mt-2">{error?.message}</p>}
        </div>
      );
    }}
  />
);

export default NumericInputController;
