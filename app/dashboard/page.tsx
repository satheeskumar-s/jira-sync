"use client";

import { useEffect } from "react";
import { withAuth } from "../context/withAuth";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/time-logs");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
export default withAuth(Dashboard);
