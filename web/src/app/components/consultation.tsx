import React from "react";

import Image from "next/image";
import FileIcon from "../assets/link-45deg.svg";
import SubmitIcon from "../assets/arrow-right-circle-fill.svg";

// Include Logic for uploading FILES
// Include Logic for sumitting Prompt for the current PATIENT ID

export default function Consultation() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-2.5">
      <div className="text-[#c4dad2] self-stretch text-[21px] font-normal font-sans tracking-tighter">
        Consultation:{" "}
      </div>
      <div className="w-full h-[60px] flex flex-row px-[33px] bg-[#292727] rounded-[20px] justify-start gap-4">
        <Image src={FileIcon} alt="" />
        <textarea
          className="w-full h-[60px] py-4 text-xl font-normal bg-[#292727] text-[#c4dad2] font-sans placeholder:tracking-tighter placeholder:flex placeholder:flex-col placeholder:justify-center placeholder:text-xl placeholder:font-normal placeholder:font-sans placeholder:italic placeholder:bg-[#292727] resize-none overflow-hidden"
          placeholder="Prompt the patient model here."
        ></textarea>
        <Image src={SubmitIcon} alt="" />
      </div>
    </div>
  );
}
