import LoginForm from "@/components/pages/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">ورود به حساب کاربری</h1>
                <LoginForm />
                <p className="mt-4 text-center">
                    حساب ندارید? <Link href="/register" className="text-blue-600">ثبت نام</Link>
                </p>
            </div>
        </main>
    );
}