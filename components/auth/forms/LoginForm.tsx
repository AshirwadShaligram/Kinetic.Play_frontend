"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks/authHooks";
import { loginUser } from "@/redux/slice/authSlice";
import { LoginFormData } from "@/types/authTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "reicon-react";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (userData: LoginFormData) => {
    try {
      const result = await dispatch(
        loginUser({
          email: userData.email.trim(),
          password: userData.password,
        }),
      ).unwrap();

      toast.success(result.message);
      router.push("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );

      console.error("Login error:", error);
    }
  };

  return (
    <main className="flex h-full flex-col lg:flex-row">
      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Access Kinetic Portal</h1>

          <p className="text-[13px]">
            Enter your verified credentials, security passkey, or builder token
            to manage drops, rigs and hardware queues.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-[11px] font-semibold text-slate-700"
              >
                Registered Email
              </Label>

              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",

                  maxLength: {
                    value: 255,
                    message: "Email must be 255 characters or less",
                  },

                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`rounded-xl border-slate-200 transition-colors focus-visible:ring-accent ${
                  errors.email
                    ? "border-red-400 focus-visible:ring-red-400"
                    : ""
                }`}
              />

              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="text-[11px] font-semibold text-slate-700"
              >
                Hardware Security key or Token
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter token string or passkey"
                  {...register("password", {
                    required: "Password is required",

                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },

                    maxLength: {
                      value: 100,
                      message: "Password must be 100 characters or less",
                    },
                  })}
                  className={`rounded-xl border-slate-200 pr-10 transition-colors focus-visible:ring-accent ${
                    errors.password
                      ? "border-red-400 focus-visible:ring-red-400"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-emerald-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-linear-to-r from-accent to-amber-400 py-5 font-semibold text-white shadow-md transition-all hover:from-amber-700 hover:to-amber-600 hover:shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Authorizing account...
                </span>
              ) : (
                "Authorize & Enter portal"
              )}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <h1 className="text-[10px]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="border-b-2 border-black font-bold"
            >
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
