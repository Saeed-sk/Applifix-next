'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {Button} from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import {Loader2} from 'lucide-react';
import {UserType} from "@/types/auth";
import {cn} from "@/lib/utils";
import axiosInstance from "@/lib/axios";

export type ProfileType = {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
};

type UpdateProfileFormProps = {
    /** initialData comes from parent or a page loader */
    initialData: UserType
    className?: string
};

export default function UpdateProfileForm({initialData, className}: UpdateProfileFormProps) {
    // Initialize react-hook-form with defaultValues from props
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setError
    } = useForm<ProfileType>({
        defaultValues: initialData
    });

    // Local state for button loading and server feedback
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    // If initialData changes (e.g. after fetch), reset form fields
    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    // onSubmit handler sends PUT request to update profile
    const onSubmit = async (data: ProfileType) => {
        setLoading(true);
        setServerMessage(null);

        try {
            // Send data to your API endpoint
            await axiosInstance.post('/api/auth/update-profile', data);
            setServerMessage('Profile updated successfully.');
        } catch (err: any) {
            // If validation errors from server, map them into form errors
            const respErrors = err.response?.data;
            if (respErrors) {
                Object.entries(respErrors).forEach(([field, messages]) => {
                    setError(field as keyof ProfileType, {
                        type: 'server',
                        message: Array.isArray(messages)
                            ? messages.join(' ')
                            : String(messages)
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
        <form onSubmit={handleSubmit(onSubmit)} className={cn('w-full mx-auto space-y-6 max-w-2xl', className)}>
            {/* Full name field */}

            <h3 className={'text-2xl lg:text-4xl font-bold my-5'}>
                Personal Information
            </h3>
            <TextInput
                label="Full Name"
                type="text"
                error={errors.name?.message}
                register={{
                    ...register('name', {required: 'Name is required.'})
                }}
            />

            {/* Email field with basic pattern validation */}
            <TextInput
                label="Email"
                type="email"
                error={errors.email?.message}
                register={{
                    ...register('email', {
                        required: 'Email is required.',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email address.'
                        }
                    })
                }}
            />

            {/* First and Last name grouped */}
            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label="First Name"
                    type="text"
                    error={errors.first_name?.message}
                    register={{
                        ...register('first_name', {required: 'First name is required.'})
                    }}
                />
                <TextInput
                    label="Last Name"
                    type="text"
                    error={errors.last_name?.message}
                    register={{
                        ...register('last_name', {required: 'Last name is required.'})
                    }}
                />
            </div>

            {/* Phone number with numeric pattern */}
            <TextInput
                label="Phone"
                type="tel"
                error={errors.phone?.message}
                register={{
                    ...register('phone', {
                        required: 'Phone number is required.',
                        pattern: {
                            value: /^[0-9]{7,15}$/,
                            message: 'Invalid phone number.'
                        }
                    })
                }}
            />

            {/* Address field */}
            <TextInput
                label="Address"
                type="text"
                error={errors.address?.message}
                register={{
                    ...register('address', {required: 'Address is required.'})
                }}
            />

            {/* City and State grouped */}
            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    label="City"
                    type="text"
                    error={errors.city?.message}
                    register={{
                        ...register('city', {required: 'City is required.'})
                    }}
                />
                <TextInput
                    label="State"
                    type="text"
                    error={errors.state?.message}
                    register={{
                        ...register('state', {required: 'State is required.'})
                    }}
                />
            </div>

            {/* Server success or general error message */}
            {serverMessage && (
                <p className={`text-sm ${serverMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {serverMessage}
                </p>
            )}

            {/* Submit button with loading indicator */}
            <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2"
            >
                {loading && <Loader2 className="animate-spin"/>}
                <span>{loading ? 'Updating...' : 'Update Profile'}</span>
            </Button>
        </form>
    );
}
