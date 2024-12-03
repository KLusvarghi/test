import React from "react";
import Error from "../Error/Error";
import { Option } from "../Form/FilterGroupForm";
import classNames from "classnames";

// Componente de input em geral
interface IInputProps {
  variant?: "textarea" | "select" | "radio" | "default";
  placeholder?: string;
  type?: string;
  name?: string;
  value: string | number;
  error?: string | null;
  onBlur?: () => void;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  options?: Option[];
}
export const inputClass =
  // "w-full rounded-md shadow-sm text-grayscale-c10 font-medium text-sm leading-base font-poppins cursor-pointer px-6 py-2";
  "w-full rounded-md shadow-sm text-grayscale-c08 font-medium	text-[12px] leading-base font-poppins cursor-pointer px-2 py-1";

const Input = ({
  variant = "default",
  placeholder,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
}: IInputProps) => {
  switch (variant) {
    case "default":
      return (
        <div className="flex w-full flex-col gap-1 self-center">
          <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur}
            className={inputClass}
          />
          <Error error={error} />
        </div>
      );
    case "select":
      return (
        <select
          value={value}
          onChange={onChange}
          // className={classNames("cursor-pointer rounded-md px-6 py-2 text-sm shadow-sm text-grayscale-c10 font-medium font-poppins", {
          className={classNames(
            "text-grayscale-c08 cursor-pointer rounded-md px-2 py-1 font-poppins text-[12px] font-normal shadow-sm",
            {
              inputClass,
            },
          )}
        >
          {options?.map((item, index) => (
            <option
              className="text-grayscale-c08"
              key={index}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <div className="flex w-full flex-col gap-1 self-center">
          <input
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur}
            className={inputClass}
          />
          <Error error={error} />
        </div>
      );
  }
};

export default Input;
