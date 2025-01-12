import React from "react";

export default function Summary({ summary }: { summary: string }) {
  return (
    <div className="w-full h-full flex-col justify-start items-start gap-[13px] inline-flex">
      <div className="text-[#c4dad2] text-[21px] font-normal font-['DM Sans']">
        Summary:{" "}
      </div>
      <div className=" h-full self-stretch text-white text-sm font-normal font-sans">
        {summary}
      </div>
    </div>
  );
}
