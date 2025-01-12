import React from "react";

export default function TreamentPlan({
  treatmentPlan,
}: {
  treatmentPlan: string;
}) {
  return (
    <div className="h-max flex-col justify-start p-2 items-start gap-2.5 inline-flex">
      <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans">
        Treatment Plan:
      </div>
      <div className="self-stretch grow text-[#B8CDC5] p-4– shrink basis-0  rounded-[20px]">
        {" "}
        {treatmentPlan}
      </div>
    </div>
  );
}
