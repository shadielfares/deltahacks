"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Summary from "./components/summary";
import TreamentPlan from "./components/treament-plan";
import Medicine from "./components/medicine";
import Analysis from "./components/analysis";

import Image from "next/image";
import FileIcon from "./assets/link-45deg.svg";
import SubmitIcon from "./assets/arrow-right-circle-fill.svg";

export default function ProfileClient() {
  const { error, isLoading } = useUser();
  const [data, setData] = useState("");
  const [data3, setData3] = useState("");
  const [data4, setData4] = useState("");

  const [data2, setData2] = useState("");
  const [input, setInput] = useState("");

  const fetchData = async (prompt: string, patientId: string) => {
    try {
      const response = await axios.post("http://localhost:8000/ask", {
        prompt,
        patient_id: patientId,
      });
      console.log(response);
      setData(response.data.analysis);
      setData2(response.data.potential_diagnosis);
      setData3(response.data.dosage_calculation);
      setData4(response.data.recommended_treatment);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading)
    return <div className="text-center text-gray-400 mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-400 mt-10">{error.message}</div>
    );

  return (
    <div className="bg-[#101010] w-full p-10 items-end overflow-hidden">
      <div className="flex flex-row gap-6 w-full ">
        <div className="flex flex-col gap-4 w-1/2 h-1/2">
          <Summary
            summary={
              data2 ? data2 : "Here is where the potential diagnosis will be"
            }
          />
          <Analysis
            analysis={data ? data : "Here is where the analysis will be"}
          />
        </div>

        <div className="flex flex-col gap-4 w-1/2 h-1/2 items-end justify-end align-end ">
          <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans tracking-tighter">
            Treatment:
          </div>

          <div className=" flex-grow rounded-lg  shadow-lg gap-4">
            <Medicine medicine="2g" dosage="5g" />
            <TreamentPlan
              treatmentPlan={
                data4 ? data4 : "Here is where the treatment plan will be"
              }
            />
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(input, "d604da9-9a81-4ba9-80c2-de3375d59b40");
        }}
        className=" rounded-lg shadow-lg py-4"
      >
        <div className="w-full h-full flex flex-col justify-start items-start gap-2.5">
          <div className="text-[#c4dad2] self-stretch text-[21px] font-normal font-sans tracking-tighter">
            Consultation:{" "}
          </div>
          <div className="w-full h-[60px] flex flex-row px-[33px] bg-[#292727] rounded-[20px] justify-start gap-4">
            <Image src={FileIcon} alt="" />
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="w-full h-[60px] py-4 text-xl font-normal bg-[#292727] text-[#c4dad2] font-sans placeholder:tracking-tighter placeholder:flex placeholder:flex-col placeholder:justify-center placeholder:text-xl placeholder:font-normal placeholder:font-sans placeholder:italic placeholder:bg-[#292727] resize-none overflow-hidden"
              placeholder="Prompt the patient model here."
            ></textarea>
            <button type="submit" className="h-[60px]">
              <Image src={SubmitIcon} alt="" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
