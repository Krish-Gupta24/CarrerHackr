"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/zod";
import { isOnboarded } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setErrorMessage(null);

    const res = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
    });

    if (res?.error) {
      setErrorMessage("Check your Credentials");
      toast.error("Login Failed");
    } else {
      toast.success("Login Successful");
      const { Onboarded } = await isOnboarded();

      if (!Onboarded) {
        toast.success("ONBOARDING");
        router.push("/onboarding");
      } else {
        toast.success("NOT ONBOARDING");
        router.push("/");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background"
      )}
    >
      <Card className="w-full max-w-md shadow-xl p-6 rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Continue To CareerHackr
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs text-center text-red-500">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full">
              Continue
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
