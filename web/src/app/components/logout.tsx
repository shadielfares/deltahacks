"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

// Include the logic for Auth 0 to actually log out and route to Login Page

const LogoutContainer = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full justify-start">
      {user ? (
        <>
          <h1 className="text-white text-sm font-normal font-sans text-left">
            Logged in as {user?.name}
          </h1>
          <div>
            <motion.button
              onClick={() => router.push("/api/auth/logout")}
              className="w-full mt-4 h-[52px] p-[17px] bg-[#e9efec] rounded-[10px] justify-center items-center gap-2.5 inline-flex overflow-hidden"
              style={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              Sign Out
            </motion.button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default LogoutContainer;
