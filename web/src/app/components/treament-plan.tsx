import React from "react";

export default function TreamentPlan({
  treatmentPlan,
}: {
  treatmentPlan: string;
}) {
  return (
    <div className="h-full flex-col justify-start items-start gap-2.5 inline-flex my-4">
      <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans tracking-tighter">
        Treatment Plan:
      </div>
      <div className="self-stretch grow shrink basis-0 bg-[#292727] text-white rounded-[20px] gap-10 px-6 py-5">
        {" "}
        {treatmentPlan}
      </div>
    </div>
  );
}
