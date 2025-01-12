import React from "react";

export default function TreamentPlan(treamentPlan: string) {
  return (
    <div className="h-max flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans">
        Treatment Plan:
      </div>
      <div className="self-stretch grow shrink basis-0 bg-[#292727] rounded-[20px]">
        {" "}
        {treamentPlan}
      </div>
    </div>
  );
}