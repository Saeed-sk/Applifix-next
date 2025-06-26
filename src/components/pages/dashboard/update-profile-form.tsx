'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import {Loader2} from 'lucide-react';
import {UserType} from "@/types/auth";
import {cn} from "@/lib/utils";
import axiosInstance from "@/lib/axios";
import {AuthRoutes} from "@/api/auth-routes";
import ImageInput from "@/components/ui/Image-input";
import {nullable} from "zod";

export type ProfileType = {
    name: string;
    email: string;
    phone: string;
    image: FileList
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

        // ساختن FormData
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);

        // avatar ممکن است FileList باشد
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        console.log(data.image)
        try {
            await axiosInstance.post(AuthRoutes.AUTH.UPDATE, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            setServerMessage('Profile updated successfully.');
        } catch (err: any) {
            const resp = err.response?.data;
            console.log(err)
            if (resp?.errors) {

                // خطاها زیر resp.errors هستند
                Object.entries(resp.errors).forEach(([field, messages]) => {
                    setError(field as keyof ProfileType, {
                        type: 'server',
                        message: Array.isArray(messages)
                            ? (messages as string[]).join(' ')
                            : String(messages)
                    });
                });
            } else {
                setServerMessage('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={cn('w-full mx-auto space-y-6 max-w-2xl bg-white p-5 rounded-20 shadow-lg mt-10', className)}>
            {/* Full name field */}
            <ImageInput
                alt={'avatar'}
                userImage={initialData.avatar}
                error={errors.image?.message}
                onChangeAction={{
                    ...register('image', {required: 'Avatar is required.'})
                }}
            />
            {/*<TextInput*/}
            {/*    label="Avatar"*/}
            {/*    type="file"*/}
            {/*    error={errors.image?.message}*/}
            {/*    register={{*/}
            {/*        ...register('image', {required: 'Avatar is required.'})*/}
            {/*    }}*/}
            {/*/>*/}

            <TextInput
                label="User Name"
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
                disabled={loading}
                className="mx-auto flex items-center justify-center space-x-2"
            >
                {loading && <Loader2 className="animate-spin"/>}
                <span>{loading ? 'Updating...' : 'Update Profile'}</span>
            </Button>
        </form>
    );
}
