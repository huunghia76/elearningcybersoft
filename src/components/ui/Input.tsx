/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
   label?: string;
   id?: string;
   type?: HTMLInputTypeAttribute;
   register?: UseFormRegister<any>;
   error?: string;
   placeholder?: string;
   className?: string;
   classNameLabel?: string;
   name?: string;
   classNameInput?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Input = ({
   label,
   id,
   register,
   type = "text",
   error,
   placeholder,
   className = "",
   classNameLabel = "",
   name,
   classNameInput,
   onChange,
}: InputProps) => {
   return (
      <div className={className}>
         {!!label && (
            <label className={`text-white ` + classNameLabel} htmlFor={id}>
               {label}
            </label>
         )}
         <input
            id={id}
            placeholder={placeholder}
            type={type}
            className={`p-10 mt-8 w-full text-white rounded-6 bg-[#333] ${classNameInput} `}
            {...register?.(name ? name : "")}
            onChange={onChange}
         />
         {!!error && <p className="text-red-500 text-14">{error}</p>}
      </div>
   );
};
