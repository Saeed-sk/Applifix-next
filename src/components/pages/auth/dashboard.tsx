'use client';
import {useAuth} from '@/hooks/useAuth';
import {UserType} from "@/types/auth";

export default function DashboardPage() {
    const {user, logout} = useAuth();
    return (
        <main>
            <div className="p-8">

                <h2 className="text-xl">خوش آمدی، {user?.name}</h2>
                <button onClick={logout} className="mt-4">خروج</button>
                <section className="mt-6">
                    <h3>آمار شما</h3>
                </section>
            </div>
        </main>
    );
}