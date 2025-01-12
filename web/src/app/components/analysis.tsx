import React from "react";

export default function Analysis({ analysis }: { analysis: string }) {
  return (
    <div className=" flex-col justify-start items-start gap-2.5 inline-flex ">
      <div className=" text-[#c4dad2] text-[21px] font-normal font-sans tracking-tighter">
        Analysis:
      </div>
      <div className="h-full w-full bg-[#292727] text-white rounded-[20px] gap-10 px-6 py-5 ">
        {" "}
        {analysis}
      </div>
    </div>
  );
}
