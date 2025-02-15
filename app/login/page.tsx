"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = auth?.login(email, password);
    if (!success) setError("Invalid credentials");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error && <p className="text-red-500">{error}</p>}

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-center">
            Add jira project details to login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your internal and external project details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4">
              <div className="grid grid-cols-[1fr_2px_1fr] gap-4 items-center">
                <div className=" items-center gap-4">
                  <div>
                    <h2 className=" font-bold mb-4">Internal</h2>
                  </div>
                  <div className="flex flex-col my-4">
                    <Label className="mb-1" htmlFor="name">
                      Domain
                    </Label>
                    <Input
                      id="name"
                      placeholder="Type your jira domain"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-xs mt-0">www.aaa.sss</p>
                  </div>
                  <div className="flex flex-col my-4">
                    <Label className="mb-1" htmlFor="name">
                      Project
                    </Label>
                    <Input
                      id="name"
                      placeholder="Name of your project"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="h-full bg-gray-200"></div>
                <div className=" items-center gap-4">
                  <div>
                    <h2 className=" font-bold mb-4">External</h2>
                  </div>
                  <div className="flex flex-col my-4">
                    <Label className="mb-1" htmlFor="name">
                      Domain
                    </Label>
                    <Input id="name" placeholder="Type your jira domain" />
                    <p className="text-xs mt-0">www.aaa.sss</p>
                  </div>
                  <div className="flex flex-col my-4">
                    <Label className="mb-1" htmlFor="name">
                      Project
                    </Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Type your jira email"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">
                    Token
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span className="text-xs font-bold">{"  "}@help</span>
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
                              Create a token with less...
                              <a href="aaa" target="_blank">
                                aaa
                              </a>
                            </p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </Label>

                  <Input
                    id="token"
                    type="text"
                    placeholder="Type your jira token"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="px-4">
            <Button>Login</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default withAuth(Login);
