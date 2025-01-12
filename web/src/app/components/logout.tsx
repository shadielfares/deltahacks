"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

// Include the logic for Auth 0 to actually log out and route to Login Page

const LogoutContainer = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div>
      {user ? (
        <>
          <Avatar>
            <AvatarImage
              src={user.picture as string}
              alt={user.name as string}
            />
          </Avatar>

          <h1 className="text-center text-white text-sm font-normal font-sans">
            Logged in as {user?.name}
          </h1>
          <motion.button
            onClick={() => router.push("/api/auth/logout")}
            className="w-full h-[52px] p-[17px] bg-[#e9efec] rounded-[10px] justify-center items-center gap-2.5 inline-flex overflow-hidden"
            style={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            Sign Out
          </motion.button>
        </>
      ) : null}
    </div>
  );
};

export default LogoutContainer;
