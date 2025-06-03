'use client';

import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import axios from '@/lib/axios';
import {
    AuthProps,
    LoginType,
    RegisterType,
    ResponseTypeAuth,
    UserType,
} from '@/types/auth';
import {AuthRoutes} from '@/api/auth-routes';
import {ApiResponse} from "@/types/index.js";

export const useAuth = ({middleware, redirectIfAuthenticated}: AuthProps = {}) => {
    const router = useRouter();

    // 1) State
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'loading' | 'guest' | 'authenticated' | 'failed'>(
        Cookies.get('token') ? 'loading' : 'guest'
    );
    const [user, setUser] = useState<UserType | null>(null);
    const [postLoading, setPostLoading] = useState(false);
    const [token, setToken] = useState<string | null>(Cookies.get('token') ?? null);

    // 2) Sync cookie → token + header + guest-status if no token
    useEffect(() => {
        const accessToken = Cookies.get('token') ?? null;
        setToken(accessToken);

        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            setStatus('authenticated')
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setStatus('guest');
        }
    }, [token]);

    // 3) SWR fetch user info
    const fetcher = (url: string) => axios.get<ApiResponse<UserType>>(url).then(res => res.data.data);
    const {data, error, mutate} = useSWR<UserType>(
        token ? AuthRoutes.AUTH.ME : null,
        fetcher,
    );

    // 4) Handle SWR responses
    useEffect(() => {
        if (!token) return;

        if (data) {
            setStatus('authenticated');
            setErrors({});
            setUser(data);
        } else if (error) {
            setStatus('guest');
            setUser(null);
            Cookies.remove('token');
        } else {
            setStatus('loading');
        }
    }, [data, error, token]);

    // 5) Redirect rules
    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'authenticated' && middleware === 'guest' && redirectIfAuthenticated) {
            router.push(redirectIfAuthenticated);
        } else if (status === 'guest' && middleware === 'auth') {
            router.push('/login');
        }
    }, [status, middleware, redirectIfAuthenticated, router]);

    // 6) Token helper
    const storeToken = (accessToken: string) => {
        Cookies.set('token', accessToken, {expires: 7});
        setToken(accessToken);
    };

    // 7) Register
    const register = async (props: RegisterType) => {
        try {
            setPostLoading(true);
            setErrors({});
            const response = await axios.post<ResponseTypeAuth>(
                AuthRoutes.AUTH.REGISTER,
                props
            );
            storeToken(response.data.data.token);
            mutate();
            router.push('/dashboard');
        } catch (e: any) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors || {});
            }
            setStatus('failed');
        } finally {
            setPostLoading(false);
        }
    };

    // 8) Login
    const login = async (props: LoginType) => {
        try {
            setPostLoading(true);
            setErrors({});
            const response = await axios.post<ResponseTypeAuth>(
                AuthRoutes.AUTH.LOGIN,
                props
            );
            storeToken(response.data.data.token);
            mutate();
            router.push('/dashboard');
        } catch (e: any) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors || {});
            } else if (e.response?.status === 401) {
                setErrors({email: 'The provided credentials are incorrect.'});
            }
            setStatus('failed');
        } finally {
            setPostLoading(false);
        }
    };

    // 9) Logout
    const logout = useCallback(async () => {
        try {
            await axios.post(AuthRoutes.AUTH.LOGOUT);
        } catch {
            // ignore
        } finally {
            Cookies.remove('token');
            setToken(null);
            setStatus('guest');
            mutate();
            router.push('/login');
        }
    }, [mutate, router]);

    return {
        user,
        status,
        loading: status === 'loading',
        postLoading,
        errors,
        register,
        login,
        logout,
    };
};
