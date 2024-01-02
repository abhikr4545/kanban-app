"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import session from "@/lib/supabase/get-session";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  email: z.string().min(1, { message: "Email cannot be empty" }).email({ message: "Not a valid email" }),
  password: z.string().min(1, {
    message: "Password cannot be empty"
  })
})

export default function SignUp() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()

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
      username: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          username: values.username
        })
      })

      if (!response.ok) {
        const data = await response.json();
        console.log(data)
        toast("Uh oh! Something went wrong",{
          description: data?.error.message,
          cancel: {
            label: "x"
          }
        })
      } else {
        toast("Success!",{
          description: "User created successfully",
          cancel: {
            label: "x"
          }
        })
        router.replace("/dashboard")
      }
    } catch (error) {
      toast("Uh oh!",{
        description: "There was a problem with your request",
        cancel: {
          label: "x"
        }
      })
      console.log(error)
    } finally {
      setIsLoading(false)
    }

    form.reset()
  }

  return (
    <Card className="w-[400px] py-4 min-h-[380px] bg-pearl text-smoky-black">
      <CardContent>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-8 mt-2">      
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" className="mt-8 w-full" disabled={isLoading}>
                Sign Up
              </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}