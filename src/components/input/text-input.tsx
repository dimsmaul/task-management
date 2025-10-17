import clsx from "clsx";
import { useField } from "formik";
import React, { HTMLInputTypeAttribute, useState } from "react";

interface TextInputProps {
  /**
   * Type of the input field, default is "text"
   * @default "text"
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Value of the input field
   * @default ""
   */
  value?: string;

  /**
   * Function to handle change event
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

  /**
   * Prefix element to be displayed before the input field
   */
  prefix?: React.ReactNode;

  /**
   * Suffix element to be displayed after the input field
   */
  suffix?: React.ReactNode;

  /**
   * Name of the input field, used for Formik
   */
  name?: string;

  /**
   * Label text for the input field
   */
  label?: string;

  /**
   * Additional class names for styling
   */
  className?: string;

  /**
   * Ref to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  name,
  label,
  className,
  ref,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [formikField, meta, helpers] = useField(name || "_");

  const field = name
    ? {
        ...formikField,
        value: formikField.value || inputValue, // Pakai defaultValue jika belum ada di Formik
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          helpers.setValue(e.target.value); // Update Formik value
          setInputValue(e.target.value); // Update local state
        },
      }
    : {
        value: value ?? inputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e);
          setInputValue(e.target.value);
        },
      };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-support-100/50 mb-1">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        {prefix && (
          <div className="absolute left-3 text-gray-500">{prefix}</div>
        )}
        <input
          {...field}
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className={clsx(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-primary-100 transition-all duration-300",
            meta?.touched && meta?.error
              ? "border-red-500 focus:ring-red-500"
              : "border-support-100/30 focus:ring-blue-500",
            className
          )}
          style={{
            paddingLeft: prefix ? "2.5rem" : undefined,
            paddingRight: suffix ? "2.5rem" : undefined,
          }}
        />
        {suffix && (
          <div className="absolute right-3 text-gray-500">{suffix}</div>
        )}
      </div>
      {name && meta?.touched && meta?.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default TextInput;
