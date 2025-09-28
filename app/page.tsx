"use client";

import Link from "next/link";
import { withAuth } from "./context/withAuth";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <Link
        href="/login"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </Link>
    </div>
  );
};

export default withAuth(Home);
