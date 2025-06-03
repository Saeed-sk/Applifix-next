'use client';

import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import {LoginType} from "@/types/auth";
import {Buttons} from "@/components/ui/buttons";


export default function LoginForm() {
    // React Hook Form setup
    const {
        register: rhfRegister,
        handleSubmit,
        formState: { errors: formErrors },
        setError,
    } = useForm<LoginType>();

    // Auth hook (no mutateUser needed—login() will call mutate() internally)
    const {
        login: authLogin,
        errors: serverErrors = {},  // default to {}
        loading
    } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/dashboard' });

    const onSubmit = async (data: LoginType) => {
        await authLogin(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4">
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm">ایمیل</label>
                <input
                    id="email"
                    {...rhfRegister('email', {
                        required: 'ایمیل الزامی است',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'ایمیل نامعتبر است',
                        },
                    })}
                    className="mt-1 block w-full border p-2 rounded"
                />
                {/* Client-side or server-side email error */}
                {(formErrors.email?.message || serverErrors.email) && (
                    <p className="text-red-500 text-sm">
                        {formErrors.email?.message || serverErrors.email}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm">رمز عبور</label>
                <input
                    id="password"
                    type="password"
                    {...rhfRegister('password', {
                        required: 'رمز عبور الزامی است',
                        minLength: { value: 6, message: 'حداقل 6 کاراکتر' },
                    })}
                    className="mt-1 block w-full border p-2 rounded"
                />
                {/* Client-side or server-side password error */}
                {(formErrors.password?.message || serverErrors.password) && (
                    <p className="text-red-500 text-sm">
                        {formErrors.password?.message || serverErrors.password}
                    </p>
                )}
            </div>

            {/* Generic credentials error (e.g. wrong email/password) */}
            {serverErrors.credentials && (
                <p className="text-red-500 text-sm">{serverErrors.credentials}</p>
            )}

            <Buttons type={'submit'} variant={'primary'} disabled={loading} className={''}>
                {loading ? 'در حال ورود': 'ورود'}
            </Buttons>
        </form>
    );
}
