import React from "react";

// Include Logic for uploading FILES
// Include Logic for sumitting Prompt for the current PATIENT ID

export default function Consultation() {
  return (
    <div className="w-11/12 h-[106px] flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch  text-[21px] font-normal font-sans">
        Consultation:{" "}
      </div>
      <div className="self-stretch grow shrink basis-0 px-[33px] bg-[#292727] rounded-[20px] justify-start items-center gap-2.5 inline-flex overflow-hidden">
        <textarea
          className="grow shrink basis-0 h-[31px] text-[#e9efec] text-xl font-normal font-sans placeholder:text-[#e9efec]/70 placeholder:text-xl placeholder:font-normal placeholder:font-sans"
          placeholder="Prompt your custom model here."
        ></textarea>
      </div>
    </div>
  );
}
