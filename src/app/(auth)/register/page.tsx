import RegisterForm from "@/components/pages/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">ایجاد حساب کاربری</h1>
                <RegisterForm />
                <p className="mt-4 text-center">
                    قبلاً ثبت نام کرده‌اید? <Link href="/login" className="text-blue-600">ورود</Link>
                </p>
            </div>
        </main>
    );
}