"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

import { error } from "console";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};
type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
          toast.success('Account created successfully. Please sign in.');
          router.push('/sign-in')
      } else {
        toast.success('Signed in successfully');
          router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error");
    }
  }
  const isSignin = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px] flex flex-col px-10 justify-center">
      <div className="flex flex-col gap-6 fill-card-foreground py-14 px-10">
        <div className="flex flex-col items-center gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2>Boost Your Prep With AI</h2>
        </div>

        <h2 className="text-xl font-bold mb-4 items-center">
          {type === "sign-in" ? "Sign In" : "Sign Up" }
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full space-6 mt-4 form"
          >
            {!isSignin && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                
                placeholder="Your Name"
              />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email"
                
                placeholder="Your Email"
              />
           <FormField
                control={form.control}
                name="password"
                label="Password"
                
                placeholder="Your Password"
              />

            <Button type="submit" className="w-full">
              {type === "sign-in" ? "Login" : "Create Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignin ? "No account yet?" : "Have and account already?"}
          <Link
            href={!isSignin ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignin ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
