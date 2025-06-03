'use client';

import {useForm} from 'react-hook-form';
import {useAuth} from '@/hooks/useAuth';
import {LoginType} from "@/types/auth";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import {Loader2} from "lucide-react";


export default function LoginForm() {
    // React Hook Form setup
    const {
        register: rhfRegister,
        handleSubmit,
        formState: {errors: formErrors},
        setError,
    } = useForm<LoginType>();

    // Auth hook (no mutateUser needed—login() will call mutate() internally)
    const {
        login: authLogin,
        errors: serverErrors = {},  // default to {}
        postLoading
    } = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'});

    const onSubmit = async (data: LoginType) => {
        await authLogin(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto space-y-4">
            {/* Email */}

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
            {/* Generic credentials error (e.g. wrong email/password) */}
            {serverErrors.credentials && (
                <p className="text-red-500 text-sm">{serverErrors.credentials}</p>
            )}

            <Button type={'submit'} variant={'default'} disabled={postLoading} className={'w-full text-16 px-8'}>
                Sign In
                {postLoading && <Loader2 className={'animate-spin'}/>}
            </Button>
        </form>
    );
}
