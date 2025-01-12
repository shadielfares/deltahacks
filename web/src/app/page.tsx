"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function ProfileClient() {
  const { error, isLoading } = useUser();

  useEffect(() => {}, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return <div>Skibidi</div>;
}
