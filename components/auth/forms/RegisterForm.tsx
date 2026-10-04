"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch } from "@/redux/hooks/authHooks";
import { registerUser } from "@/redux/slice/authSlice";
import { RegisterFormData } from "@/types/authTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "reicon-react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      role: "Customer",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = async (userData: RegisterFormData) => {
    try {
      const result = await dispatch(
        registerUser({
          email: userData.email.trim(),
          password: userData.password,
          role: userData.role,
        }),
      ).unwrap();

      toast.success(result.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );

      console.error("Register error:", error);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row h-full">
      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-between p-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Create Kinetic Identity</h1>
          <p className="text-[10px]">
            Configure your competitive handle or register a certified liquid
            cooling workshop.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-3">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <label
                    htmlFor="customer"
                    className={`cursor-pointer rounded-xl border p-5 ${
                      field.value === "Customer"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem
                      value="Customer"
                      id="customer"
                      className="sr-only"
                    />

                    <div className="space-y-1">
                      <h3 className="font-semibold">Customer</h3>

                      <p className="text-sm text-muted-foreground">
                        Browse products and place orders.
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="seller"
                    className={`cursor-pointer rounded-xl border p-5 ${
                      field.value === "Seller"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem
                      value="Seller"
                      id="seller"
                      className="sr-only"
                    />

                    <div className="space-y-1">
                      <h3 className="font-semibold">Seller</h3>

                      <p className="text-sm text-muted-foreground">
                        Create a store and sell products.
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
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
                className={`rounded-xl border-slate-200 transition-colors focus-visible:ring-accent  ${
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
                className="text-sm font-medium text-slate-700"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="********"
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-700"
              >
                Confirm password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="********"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`rounded-xl border-slate-200 pr-10 transition-colors focus-visible:ring-accent ${
                    errors.confirmPassword
                      ? "border-red-400 focus-visible:ring-red-400"
                      : ""
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-emerald-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 py-5 font-semibold text-white shadow-md transition-all hover:from-emerald-700 hover:to-emerald-600 hover:shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <h1 className="text-[10px]">
            Already have an account?{" "}
            <Link href="/login" className="border-b-2 border-black font-bold">
              Sign in
            </Link>
          </h1>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
