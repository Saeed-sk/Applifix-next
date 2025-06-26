'use client';

import React, {createContext, useContext, ReactNode, useState, useEffect} from 'react';
import useSWR from 'swr';
import {AxiosResponse} from 'axios';
import axios from '@/lib/axios';
import Cookies from 'js-cookie';
import {AuthRoutes} from '@/api/auth-routes';
import {ResponseTypeAuth, UserType} from '@/types/auth';
import {useRouter} from "next/navigation";

// Context type
type AuthContextType = {
    user?: UserType;
    error?: any;
    loading: boolean;
    authenticated: boolean;
    login: (params: { email: string; password: string }) => Promise<ResponseTypeAuth>;
    register: (params: { name: string; email: string; password: string }) => Promise<ResponseTypeAuth>;
    logout: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// SWR fetcher
const fetcher = (url: string) => axios.get(url).then(res =>res.data.data);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [initialized, setInitialized] = useState(false);
    const router = useRouter()

    // Initialize: read cookie and set axios header, then mark initialized
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setInitialized(true);
    }, []);

    // Fetch user only after init
    const {data, error, mutate, isValidating} = useSWR<UserType>(
        initialized ? AuthRoutes.AUTH.ME : null,
        fetcher
    );

    // Common cookie options
    const cookieOptions = {expires: 7, path: '/', secure: true};

    const login = async ({email, password}: { email: string; password: string }) => {
        const response: AxiosResponse<ResponseTypeAuth> = await axios.post(
            AuthRoutes.AUTH.LOGIN,
            {email, password}
        );
        if (response.data.success) {
            const accessToken = response.data.data.token;
            // Save token
            Cookies.set('token', accessToken, cookieOptions);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            await mutate();
            router.push('/dashboard');
        }
        return response.data;
    };

    const register = async ({name, email, password}: { name: string; email: string; password: string }) => {
        const response: AxiosResponse<ResponseTypeAuth> = await axios.post(
            AuthRoutes.AUTH.REGISTER,
            {name, email, password}
        );
        if (response.data.success) {
            const accessToken = response.data.data.token;
            Cookies.set('token', accessToken, cookieOptions);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            await mutate();
            router.push('/dashboard');
        }
        return response.data;
    };

    const logout = async () => {
        await axios.post(AuthRoutes.AUTH.LOGOUT);
        Cookies.remove('token');
        delete axios.defaults.headers.common['Authorization'];
        await mutate(undefined, false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user: data,
                error,
                loading: isValidating || !initialized,
                login,
                authenticated: !!data,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
