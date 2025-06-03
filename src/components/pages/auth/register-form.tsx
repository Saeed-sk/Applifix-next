'use client';

import {useForm} from 'react-hook-form';
import {useAuth} from '@/hooks/useAuth';
import {RegisterType} from '@/types/auth';
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import TextInput from "@/components/ui/text-input";

export default function RegisterForm() {
    const {
        register: rhfRegister,
        handleSubmit,
        formState: {errors: formErrors},
        setError,
        watch,
    } = useForm<RegisterType>();

    const {
        register: authRegister,
        errors: serverErrors = {},
        status,
        postLoading: loading
    } = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'});

    const passwordValue = watch('password');

    const onSubmit = async (data: RegisterType) => {
        try {
            await authRegister(data);
        } catch (e: any) {
            console.log(e)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4">
            {/* نام */}
            <TextInput
                type={'text'}
                label={'Name'}
                error={(formErrors.name?.message || serverErrors.name) && (formErrors.name?.message || serverErrors.name)}
                register={{...rhfRegister('name', {required: 'name is required'})}}
            />

            {/* ایمیل */}
            <TextInput
                type={'email'}
                label={'Email'}
                error={(formErrors.email?.message || serverErrors.email) && (formErrors.email?.message || serverErrors.email)}
                register={{
                    ...rhfRegister('email', {
                        required: 'email required!',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'email is not valid',
                        },
                    })
                }}/>

            {/* رمز عبور */}
            <TextInput
                type={'password'}
                label={'Password'}
                error={(formErrors.password?.message || serverErrors.password) && (formErrors.password?.message || serverErrors.password)}
                register={{
                    ...rhfRegister('password', {
                        required: 'password required!',
                        minLength: {value: 8, message: 'password must be at least 8 characters'},
                    })
                }}/>

            {/* تکرار رمز عبور */}
            <TextInput
                type={'password'}
                label={'Confirm Password'}
                error={(formErrors.password_confirmation) && (formErrors.password_confirmation.message)}
                register={{
                    ...rhfRegister('password_confirmation', {
                        required: 'Confirm password required!',
                        validate: (value) => value === passwordValue || 'passwords do not match',
                    })
                }}/>

            <Button className={'w-full'} disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin"/>}
                {loading ? 'Please wait' : 'Sign Up'}
            </Button>
        </form>
    );
}
