'use client';

import {useForm} from 'react-hook-form';
import {useAuth} from '@/hooks/useAuth';
import {Buttons} from '@/components/ui/buttons';
import {RegisterType} from '@/types/auth';

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
            <div>
                <label htmlFor="name" className="block text-sm">نام</label>
                <input
                    id="name"
                    {...rhfRegister('name', {required: 'نام الزامی است'})}
                    className="mt-1 block w-full border p-2 rounded"
                />
                {(formErrors.name?.message || serverErrors.name) && (
                    <p className="text-red-500 text-sm">
                        {formErrors.name?.message || serverErrors.name}
                    </p>
                )}
            </div>

            {/* ایمیل */}
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
                {(formErrors.email?.message || serverErrors.email) && (
                    <p className="text-red-500 text-sm">
                        {formErrors.email?.message || serverErrors.email}
                    </p>
                )}
            </div>

            {/* رمز عبور */}
            <div>
                <label htmlFor="password" className="block text-sm">رمز عبور</label>
                <input
                    id="password"
                    type="password"
                    {...rhfRegister('password', {
                        required: 'رمز عبور الزامی است',
                        minLength: {value: 6, message: 'حداقل 6 کاراکتر'},
                    })}
                    className="mt-1 block w-full border p-2 rounded"
                />
                {(formErrors.password?.message || serverErrors.password) && (
                    <p className="text-red-500 text-sm">
                        {formErrors.password?.message || serverErrors.password}
                    </p>
                )}
            </div>

            {/* تکرار رمز عبور */}
            <div>
                <label htmlFor="password_confirmation" className="block text-sm">تکرار رمز عبور</label>
                <input
                    id="password_confirmation"
                    type="password"
                    {...rhfRegister('password_confirmation', {
                        required: 'تکرار رمز عبور الزامی است',
                        validate: (value) => value === passwordValue || 'رمزها مطابقت ندارند',
                    })}
                    className="mt-1 block w-full border p-2 rounded"
                />
                {formErrors.password_confirmation && (
                    <p className="text-red-500 text-sm">
                        {formErrors.password_confirmation.message}
                    </p>
                )}
            </div>

            <Buttons variant="primary" type="submit">
                ثبت نام
            </Buttons>
        </form>
    );
}
