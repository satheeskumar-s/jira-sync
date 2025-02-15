"use client";

import { useEffect } from "react";
import { withAuth } from "../context/withAuth";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/time-log"); // Or the actual path of your child page
  }, []);

  return null;
};
export default withAuth(Dashboard);
