import React from "react";

// Will have give the models suggested medicine for the current Patient IDS

export default function Medicine({ medicine }: { medicine: string }) {
  return (
    <div className="  h-full flex-col justify-start items-start gap-[7px] inline-flex">
      <div className="text-center text-[#c4dad2] text-[21px] font-normal font-['DM Sans'] tracking-tighter">
        Recommended medicine
      </div>
      <div className="self-stretch grow shrink basis-0 bg-[#292727] text-white  rounded-[20px] gap-10 px-6 py-5">
        {medicine}
      </div>
    </div>
  );
}
