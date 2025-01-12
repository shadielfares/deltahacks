"use client";
import React from "react";
import LogoutContainer from "./logout";
// Add Patient List

export default function Navbar() {
  return (
    <div className="flex flex-col w-[221px] h-screen px-[13px] py-[16px] bg-[#1b1a1a] justify-between items-start">
      <div className="text-center tracking-[-1.5px]">
        <span className="text-white text-[31px] font-normal font-sans">
          Oui
        </span>
        <span className="text-[#6a9c89] text-[31px] font-normal font-sans">
          Care
        </span>
      </div>
      <div className="flex-col justify-start items-start gap-[13px] flex overflow-hidden">
        <div className="text-center text-[#c4dad2] text-lg font-normal font-sans">
          Patients
        </div>
      </div>
      <LogoutContainer />
    </div>
  );
}
