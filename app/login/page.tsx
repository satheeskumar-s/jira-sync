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
                  <Label htmlFor="picture">Token</Label>
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
