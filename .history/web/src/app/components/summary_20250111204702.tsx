import React from "react";

export default function Summary() {
  return(
<div className="h-max flex-col justify-start items-start gap-[13px] inline-flex">
    <div className="text-[#c4dad2] text-[21px] font-normal font-['DM Sans']">Summary: </div>
    <div className="self-stretch h-[75px] text-white text-base font-normal font-['DM Sans']">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor in lectus vel fringilla. Nullam nunc odio, venenatis at sem. -- {Generated Summary}</div>
</div>
  );
}
