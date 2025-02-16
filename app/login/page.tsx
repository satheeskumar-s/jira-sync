"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "../context/auth";
import { withAuth } from "../context/withAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  internal_domain: z
    .string({
      required_error: "Internal domain is required",
    })
    .min(1, {
      message: "Internal domain is required.",
    }),
  internal_project: z
    .string({
      required_error: "Internal project is required.",
    })
    .min(1, {
      message: "Internal project is required.",
    }),
  external_domain: z
    .string({
      required_error: "External domain is required.",
    })
    .min(1, {
      message: "External domain is required.",
    }),
  external_project: z
    .string({
      required_error: "External project is required.",
    })
    .min(1, {
      message: "External project is required.",
    }),
  email: z
    .string({
      required_error: "Email required.",
    })
    .email("Invalid email"),
  token: z
    .string({
      required_error: "Jira token is required.",
    })
    .min(1, {
      message: "Jira token is required.",
    }),
});

const Login = () => {
  const [internalProjectError, setInternalProjectError] = useState("");
  const [externalProjectError, setExternalProjectError] = useState("");
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      internal_domain: "",
      internal_project: "",
      external_domain: "",
      external_project: "",
      email: "",
      token: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsFormSubmit(true);
    const res = await auth?.login({
      internalDomain: values.internal_domain,
      internalProject: values.internal_project,
      externalDomain: values.external_domain,
      externalProject: values.external_project,
      email: values.email,
      token: values.token,
    });
    console.log(values);

    if (res?.internalProjectError)
      setInternalProjectError("Cannot access internal project");
    if (res?.externalProjectError)
      setExternalProjectError("Cannot access external project");
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const res = auth?.login(email, password);
  //   if (res?.internalProjectError)
  //     setInternalProjectError("Cannot access internal project");
  //   if (res?.externalProjectError)
  //     setExternalProjectError("Cannot access external project");
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-center">
                Add jira project details to login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your internal and external project details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col p-4">
                <div className="grid grid-cols-[1fr_2px_1fr] gap-4 items-center">
                  <div className=" items-center gap-4">
                    <div>
                      <h2 className=" font-bold mb-4">Internal</h2>
                    </div>
                    <div className="flex flex-col my-4">
                      <FormField
                        control={form.control}
                        name="internal_domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domain</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type your jira domain"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-xs mt-0">
                        {form.watch("internal_domain") &&
                          `${form.watch("internal_domain")}.atlassian.net`}
                      </p>
                    </div>
                    <div className="flex flex-col my-4">
                      <FormField
                        control={form.control}
                        name="internal_project"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name of your project"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {internalProjectError && (
                      <p className="text-red-500">{internalProjectError}</p>
                    )}
                  </div>
                  <div className="h-full bg-gray-200"></div>
                  <div className=" items-center gap-4">
                    <div>
                      <h2 className=" font-bold mb-4">External</h2>
                    </div>
                    <div className="flex flex-col my-4">
                      <FormField
                        control={form.control}
                        name="external_domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domain</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type your jira domain"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-xs mt-0">
                        {form.watch("external_domain") &&
                          `${form.watch("external_domain")}.atlassian.net`}
                      </p>
                    </div>
                    <div className="flex flex-col my-4">
                      <FormField
                        control={form.control}
                        name="external_project"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name of your project"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {externalProjectError && (
                    <p className="text-red-500">{externalProjectError}</p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your jira email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="token"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Token
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <span className="text-xs font-bold">
                                  {"  "}@help
                                </span>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                  {/* <Avatar>
                                    <AvatarImage src="https://github.com/vercel.png" />
                                    <AvatarFallback>VC</AvatarFallback>
                                  </Avatar> */}
                                  <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">
                                      Generate token
                                    </h4>
                                    <p className="text-sm">
                                      Create a token from{" "}
                                      <span className=" font-bold underline">
                                        <a
                                          href="https://id.atlassian.com/manage-profile/security/api-tokens"
                                          target="_blank"
                                        >
                                          here
                                        </a>
                                      </span>{" "}
                                      with the minimum duration and regenerate
                                      it periodically.
                                    </p>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type your jira token"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div className="px-4">
                <Button type="submit" disabled={isFormSubmit}>
                  Login
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default withAuth(Login);
