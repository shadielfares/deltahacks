import React from "react";

export default function Consultation() {
  return (
    <div className="w-max h-[106px] flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans">
        Consultation:{" "}
      </div>
      <div className="self-stretch grow shrink basis-0 px-[33px] bg-[#292727] rounded-[20px] justify-start items-center gap-2.5 inline-flex overflow-hidden">
        <div className="w-[25px] h-[25px] relative  overflow-hidden"></div>
        <div className="grow shrink basis-0 h-[31px] text-[#e9efec]/70 text-xl font-normal font-['DM Sans']">
          Prompt your custom model here.
        </div>
        <div className="w-[25px] h-[25px] relative  overflow-hidden"></div>
      </div>
    </div>
  );
}
