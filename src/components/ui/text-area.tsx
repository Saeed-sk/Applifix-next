import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface TextAreaProps {
    label?: string;
    error?: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
                                               label,
                                               register,
                                               placeholder = '',
                                               error,
                                               disabled = false,
                                               rows = 4,
                                               className = '',
                                           }) => {
    return (
        <div className={cn(['w-full flex flex-col', className])}>
            {label && (
                <label className="block text-sm font-medium text-dark mb-1">
                    {label}
                </label>
            )}
            <textarea
                {...register}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={cn([
                    'bg-transparent outline-none shadow-sm focus:border-yellow-800 transition-all px-3 py-2.5 border-2 rounded-lg',
                    error ? 'border-red-400' : 'border-yellow-400/10',
                ])}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;