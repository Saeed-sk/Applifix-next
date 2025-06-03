'use client';

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import {Loader2} from 'lucide-react';
import {cn} from "@/lib/utils";
import axiosInstance from "@/lib/axios";
import {AuthRoutes} from "@/api/auth-routes";

export type ChangePasswordType = {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
};

export default function ChangePasswordForm({className}: { className?: string }) {
    // Set up react-hook-form
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setError,
        reset,
    } = useForm<ChangePasswordType>();

    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    // Watch new_password to validate confirmation
    const newPassword = watch('new_password', '');

    const onSubmit = async (data: ChangePasswordType) => {
        setLoading(true);
        setServerMessage(null);

        try {
            // Send PUT request to change password endpoint
            await axiosInstance.post(AuthRoutes.AUTH.PASSWORD, {
                old_password: data.old_password,
                new_password: data.new_password,
                new_password_confirmation: data.new_password_confirmation,
            });
            setServerMessage('Password changed successfully.');
            reset();
        } catch (err: any) {
            // Handle validation errors from server
            const respErrors = err.response?.data?.errors;
            if (respErrors) {
                Object.entries(respErrors).forEach(([field, messages]) => {
                    setError(field as keyof ChangePasswordType, {
                        type: 'server',
                        message: Array.isArray(messages)
                            ? messages.join(' ')
                            : String(messages),
                    });
                });
            } else {
                // Fallback for unexpected errors
                setServerMessage('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn('max-w-2xl mx-auto space-y-6 mt-10', className)}>

            <TextInput
                label="Current Password"
                type="password"
                error={errors.old_password?.message}
                register={{
                    ...register('old_password', {required: 'Current password is required.'}),
                }}
            />

            {/* New password field with minimum length validation */}
            <TextInput
                label="New Password"
                type="password"
                error={errors.new_password?.message}
                register={{
                    ...register('new_password', {
                        required: 'New password is required.',
                        minLength: {
                            value: 8,
                            message: 'New password must be at least 8 characters.',
                        },
                    }),
                }}
            />

            {/* Confirmation field must match new_password */}
            <TextInput
                label="Confirm New Password"
                type="password"
                error={errors.new_password_confirmation?.message}
                register={{
                    ...register('new_password_confirmation', {
                        required: 'Please confirm your new password.',
                        validate: (value) =>
                            value === newPassword || 'Passwords do not match.',
                    }),
                }}
            />

            {/* Show server success or general error message */}
            {serverMessage && (
                <p className={`text-sm ${serverMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {serverMessage}
                </p>
            )}

            {/* Submit button with loading spinner */}
            <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="mx-auto flex items-center justify-center space-x-2"
            >
                {loading && <Loader2 className="animate-spin"/>}
                <span>{loading ? 'Changing...' : 'Change Password'}</span>
            </Button>
        </form>
    );
}
