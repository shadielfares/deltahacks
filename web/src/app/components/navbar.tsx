import React from "react";
import LogoutPage from "./logout";

// Add Patient List

export default function Navbar() {
  return (
    <div className="flex flex-col w-[221px] h-[832px] px-4 py-[13px] bg-[#1b1a1a] justify-between items-start overflow-hidden">
      <div className="text-center">
        <span className="text-white text-[31px] font-normal font-['DM Sans']">
          Oui
        </span>
        <span className="text-[#6a9c89] text-[31px] font-normal font-['DM Sans']">
          Care
        </span>
      </div>
      <div className="flex-col justify-start items-start gap-[13px] flex overflow-hidden">
        <div className="text-center text-[#c4dad2] text-[15px] font-normal font-['DM Sans']">
          Patients
        </div>
      </div>
      <LogoutPage />
    </div>
  );
}
