'use client';

import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import {
    AuthProps,
    LoginType,
    RegisterType,
    ResponseTypeAuth,
    UserType,
} from "@/types/auth";

/**
 * Custom hook for managing user authentication and route protection.
 *
 * @param {AuthProps} options - Configuration options for middleware and redirection.
 * @param {'guest' | 'auth'} options.middleware
 *   - 'guest': Redirects authenticated users away from guest-only pages (e.g., login/register).
 *   - 'auth': Protects auth-only pages and redirects guests to the login page.
 * @param {string} [options.redirectIfAuthenticated]
 *   - The path to redirect to when a 'guest' middleware detects an already authenticated user.
 *   - Commonly set to '/dashboard' or a similar post-login landing page.
 */
export const useAuth = ({middleware, redirectIfAuthenticated}: AuthProps = {}) => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'loading' | 'guest' | 'authenticated' | 'failed'>('loading');
    const [user, setUser] = useState<UserType | null>(null);

    // Set default Authorization header from cookie on mount
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    // Fetcher using Authorization header
    const fetcher = (url: string) => axios.get(url).then(res => res.data);
    const {data, error, mutate} = useSWR<UserType>('/api/auth/me', fetcher);

    // Sync auth state based on SWR response
    useEffect(() => {
        if (data) {
            setStatus('authenticated');
            setErrors({});
            setUser(data);
        } else if (error) {
            setStatus('guest');
            setUser(null);
        } else {
            setStatus('loading');
        }
    }, [data, error]);

    // Redirect users based on auth status and middleware
    useEffect(() => {
        // if (status === 'authenticated' && middleware === 'guest' && redirectIfAuthenticated) {
        //     router.push(redirectIfAuthenticated);
        // } else if (status === 'guest' && middleware === 'auth') {
        //     router.push('/login');
        // }
    }, [status, middleware, redirectIfAuthenticated, router]);

    // Helper to store token in cookies and set header
    const storeToken = (token: string) => {
        Cookies.set('token', token, {expires: 7});
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Register a new user
    const register = async (props: RegisterType) => {
        try {
            setStatus('loading');
            const response = await axios.post<ResponseTypeAuth>('/api/auth/register', props);
            // Store received access token
            storeToken(response.data.access_token);
            await mutate();
            router.push('/dashboard');
        } catch (e: any) {
            if (e.response?.status === 422) {
                setErrors(e.response.data || {});
            } else {
                throw e;
            }
            setStatus('failed');
        }
    };

    // Log in an existing user
    const login = async (props: LoginType) => {
        try {
            setStatus('loading');
            const response = await axios.post<ResponseTypeAuth>('/api/auth/login', props);
            // Store received access token
            storeToken(response.data.access_token);
            await mutate();
            router.push('/dashboard');
        } catch (e: any) {
            if (e.response?.status === 422) {
                setErrors(e.response.data || {});
            } else if (e.response.status === 401) {
                setErrors({
                    email: 'The provided credentials are incorrect.',
                });
            } else {
                throw e;
            }
            setStatus('failed');
        }
    };

    // Log out the current user
    const logout = useCallback(async () => {
        try {
            await axios.post('/api/auth/logout');
        } catch (e) {
            console.error(e);
        } finally {
            // Remove token and header
            Cookies.remove('token');
            delete axios.defaults.headers.common['Authorization'];
            setStatus('guest');
            await mutate();
            router.push('/login');
        }
    }, [mutate, router]);

    return {
        user: data ?? null,
        status,
        loading: status === 'loading',
        errors,
        register,
        login,
        logout,
    };
};
