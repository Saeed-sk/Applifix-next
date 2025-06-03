// TextInput.tsx
import React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import {cn} from "@/lib/utils";

interface TextInputProps {
    label?: string;
    error?: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 label,
                                                 register,
                                                 placeholder = '',
                                                 error,
                                                 type = 'text',
                                                 disabled = false,
                                                 className = '',
                                             }) => {
    return (
        <div className={'w-full flex flex-col'}>
            {label && (
                <label className="block text-sm font-medium text-dark mb-1">
                    {label}
                </label>
            )}
            <input
                {...register}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                className={cn(['rounded-full  px-[20px] py-[12px] outline-none border', (error ? 'border-red-400 ' : 'border-[#CCCBFE]')])}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;
