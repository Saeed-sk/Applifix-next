'use client';

import {useForm} from 'react-hook-form';
import {LoginType} from '@/types/auth';
import {Button} from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import {Loader2} from 'lucide-react';
import {useState} from 'react';
import {useAuth} from '@/store/AuthProvider';

export default function LoginForm() {
    const {login} = useAuth();

    const {
        register: rhfRegister,
        handleSubmit,
        formState: {errors: formErrors},
        setError,
    } = useForm<LoginType>();

    const [postLoading, setPostLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

    const onSubmit = async (data: LoginType) => {
        setPostLoading(true);
        setServerErrors({});

        try {
            const response = await login({email: data.email, password: data.password});
        } catch (e: any) {
            if (e.response?.status === 422 || e.response?.status === 401) {
                setServerErrors({credentials: 'the provided credentials are incorrect.'});
            } else if (e.response?.status === 429) {
                setError('email', {message: 'Too many requests. Please try again later.'});
            } else {
                setError('email', {message: 'Something went wrong. Please try again.'});
            }
        } finally {
            setPostLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto space-y-4">
            <TextInput
                type="email"
                label="Email"
                error={formErrors.email?.message || serverErrors.email}
                register={{
                    ...rhfRegister('email', {
                        required: 'email required!',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'email is not valid',
                        },
                    }),
                }}
            />

            <TextInput
                type="password"
                label="Password"
                error={formErrors.password?.message || serverErrors.password}
                register={{
                    ...rhfRegister('password', {
                        required: 'password required!',
                        minLength: {value: 8, message: 'password must be at least 8 characters'},
                    }),
                }}
            />

            {serverErrors.credentials && (
                <p className="text-red-500 text-sm">{serverErrors.credentials}</p>
            )}

            <Button type="submit" variant="default" disabled={postLoading} className="w-full text-16 px-8">
                Sign In
                {postLoading && <Loader2 className="animate-spin"/>}
            </Button>
        </form>
    );
}
