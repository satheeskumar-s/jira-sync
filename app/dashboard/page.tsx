"use client";

import { useAuth } from "../context/auth";
import { withAuth } from "../context/withAuth";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome, {auth?.user}!</p>
      <button
        onClick={auth?.logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};
export default withAuth(Dashboard);
