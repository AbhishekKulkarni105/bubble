import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  // Replaces Bubble `login` page. Supabase Auth email/password.
  // Already-authenticated users are redirected to /dashboard by middleware.
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-xl font-semibold">Sign in to Diamondback</h1>
        <LoginForm />
      </div>
    </div>
  );
}
