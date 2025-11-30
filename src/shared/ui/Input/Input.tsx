import React, { type ChangeEvent } from "react";
import "./style.css";

type InputProps = {
  placeholder: string;
  className: string;
  classNameError: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  hint?: string;
  id?: string;
  label?: string;
  icon?: {
    url: string;
    alt: string;
    className?: string;
    onClick?: () => void;
  };
  value?: string;
  isError?: boolean;
  type?: "password" | "email";
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      classNameError,
      className,
      onChange,
      isError,
      placeholder,
      type,
      label,
      value,
      name,
      id,
      hint,
      icon,
    },
    ref,
  ) => {
    return (
      <div className={`input ${className} ${isError ? classNameError : ""}`}>
        {label && (
          <label className={"input__label"} htmlFor={id || name}>
            {label}
          </label>
        )}
        <div className="input__cover">
          <input
            ref={ref}
            name={name}
            id={id || name}
            value={value}
            type={type || "text"}
            className={"input__input-element"}
            placeholder={placeholder}
            onChange={onChange}
          />
          {icon &&
            (icon.onClick ? (
              <button
                type="button"
                className={icon.className && `${icon.className}-button`}
                onClick={icon.onClick}
              >
                <img className={icon.className} src={icon.url} alt={icon.alt} />
              </button>
            ) : (
              <img className={icon.className} src={icon.url} alt={icon.alt} />
            ))}
        </div>
        {hint && <p className={"input__hint"}>{hint}</p>}
      </div>
    );
  },
);
