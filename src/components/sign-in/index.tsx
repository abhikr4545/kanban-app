"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import session from "@/lib/supabase/get-session";
import SupabaseBrowserClient from "@/lib/supabase/browser-client";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email cannot be empty" }).email({ message: "Not a valid email" }),
  password: z.string().min(1, {
    message: "Password cannot be empty"
  })
})

export default function SignIn() {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getUserSession = async () => {
      const user = await session()

      if(user.data.session) {
        router.push("/dashboard");
      }
    }

    getUserSession()
  },[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })

      if(!response.ok) {
        toast("Invalid Credentials", {
          cancel: {
            label: "x"
          }
        })
        return;
      }

      router.push("/dashboard")
    } catch (error) {
      toast("Uh oh! Something went wrong.",{description: "There was a problem with your request", cancel: {
        label: "x"
      }})
    } finally {
      setIsLoading(false);
    }

    form.reset()
  }

  const handleSignInWithGithub = async () => {
    setIsLoading(true)
    try {
      console.log(isLoading)
      const supabase = SupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://localhost:3000/api/auth/sign-in-github?next=/dashboard",
        }
      });

      if (error) {
        console.error(error);
        return;
      }
      
    } catch(error) {
      console.log(isLoading, "From catch block")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-[400px] py-4 bg-pearl text-smoky-black">
      <CardContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-smoky-black">
          <div className="grid w-full items-center gap-4 mt-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <Button type="submit" className="mt-6 w-full" disabled={isLoading}>Login</Button>
        </form>
      </Form>
      </CardContent>
      <Separator className="mb-6 w-[90%] mx-auto" />
      <CardFooter className="flex items-center flex-col gap-2">
        <Button onClick={handleSignInWithGithub} disabled={isLoading} variant="outline" className="w-full">
          <FaGithub size={`16px`} className="mr-4" /> Github
        </Button>
      </CardFooter>
    </Card>
  )
}