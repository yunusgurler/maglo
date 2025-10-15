import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { FieldError } from "../../components/ui/FieldError";
import toast, { Toaster } from "react-hot-toast";
import { useRegister } from "../../hooks/api/useUser";
import { useAuthStore } from "../../stores/auth";
import hero from "../../assets/hero.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/maglo-logo.png";
import googleLogo from "../../assets/Google.png";
const schemaR = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email(),
  password: z.string().min(6, "Min 6 characters"),
});
type FormDataR = z.infer<typeof schemaR>;

export default function SignUp() {
  const navigate = useNavigate();
  const { accessToken, setTokens } = useAuthStore();

  useEffect(() => {
    if (accessToken) navigate("/", { replace: true });
  }, [accessToken, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<FormDataR>({ resolver: zodResolver(schemaR) });

  const registerM = useRegister();

  const onSubmit = async (data: FormDataR) => {
    try {
      const res = await registerM.mutateAsync({
        fullName: data.fullName, 
        email: data.email,
        password: data.password,
      });

      setTokens({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (e: any) {
      const api = e?.response?.data;
      const details: Array<{ field?: string; message?: string }> =
        api?.details ?? [];

      if (details.length) {
        const fieldMap: Record<string, keyof FormDataR> = {
          fullName: "fullName",
          name: "fullName", 
          email: "email",
          password: "password",
        };

        details.forEach((d) => {
          const f = d.field
            ? fieldMap[d.field] ?? (d.field as keyof FormDataR)
            : undefined;
          if (f) {
            setError(f, {
              type: "server",
              message: d.message || "Invalid value",
            });
          }
        });

        const first =
          details[0]?.field &&
          (fieldMap[details[0].field] as keyof FormDataR | undefined);
        if (first) setFocus(first);

        setError("root", {
          type: "server",
          message: api?.message || "Please check the highlighted fields.",
        });

        toast.error(api?.message || "Please check the highlighted fields.");
      } else {
        setError("root", {
          type: "server",
          message: api?.message || "Signup failed",
        });
        toast.error(api?.message || "Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen relative bg-white">
      <Toaster position="top-right" />

      <div className="hidden md:block absolute inset-y-0 right-0  overflow-hidden">
        <img
          src={hero}
          alt="promo"
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full px-8 md:pl-12 md:pr-[clamp(320px,42vw,720px)]">
          <div className="mb-8 max-w-[520px] mx-auto">
            <div className="flex items-center gap-2">
              <img src={logo} width={122} height={30} alt="Maglo" />
            </div>
          </div>

          <div className="max-w-[520px] w-full mx-auto">
            <div className="mb-6">
              <h1 className="text-[36px] leading-[42px] font-semibold text-ink">
                Create new account
              </h1>
              <p className="mt-1 text-[13px] leading-5 text-slate-500">
                Welcome back! Please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full name
                </label>
                <Input
                  className="h-11"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  {...register("fullName")}
                  error={!!errors.fullName}
                />
                <FieldError message={errors.fullName?.message} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <Input
                  className="h-11"
                  placeholder="email@domain.com"
                  disabled={isSubmitting}
                  {...register("email")}
                  error={!!errors.email}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <Input
                  className="h-11"
                  type="password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("password")}
                  error={!!errors.password}
                />
                <FieldError message={errors.password?.message} />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full h-11 text-[15px] bg-brand hover:bg-brand-dark"
              >
                Create account
              </Button>

              <button
                type="button"
                className="w-full h-11 rounded-lg border border-slate-200 bg-white flex items-center justify-center gap-2 text-sm hover:bg-slate-50 transition"
              >
                <img src={googleLogo} width={24} height={24} alt="Google" />
                <span>Sign up with google</span>
              </button>

              <p className="text-xs text-slate-500 text-center mt-2">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="relative font-medium text-ink inline-block"
                >
                  Sign in
                  <span className="block h-[6px] w-10 rounded-full bg-brand mt-[2px] mx-auto"></span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
