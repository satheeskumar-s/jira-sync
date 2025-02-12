"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth";

export function withAuth(Component: React.FC) {
  return function ProtectedComponent() {
    const auth = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (auth?.user) {
        // If logged in and on login page, redirect to dashboard
        if (pathname === "/login" || pathname === "/") {
          router.push("/dashboard");
        }
      } else {
        // If not logged in, redirect to login (except on login page)
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    }, [auth?.user, pathname, router]);

    // Prevent flickering while redirecting
    if (!auth?.user && pathname !== "/login") return null;

    return <Component />;
  };
}
