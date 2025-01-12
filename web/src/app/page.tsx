"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Consultation from "./components/consultation";
import Summary from "./components/summary";
import TreamentPlan from "./components/treament-plan";
import Medicine from "./components/medicine";
import Analysis from "./components/analysis";

export default function ProfileClient() {
  const { error, isLoading } = useUser();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async (prompt: string, patientId: string) => {
      try {
        const response = await axios.post("http://localhost:8000/ask", {
          prompt,
          patient_id: patientId,
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(
      "Patient is suffering from Dry skin, Itchy skin, Skin rash, Bumps on your skin, Thick, leathery patches of skin, Flaky, scaly or crusty skin, Swelling. based on your medical knowledge",
      "d604da9-9a81-4ba9-80c2-de3375d59b40"
    );
  }, []);

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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet tortor sit amet suscipit sollicitudin. Donec a tincidunt nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi volutpat ullamcorper urna sed ornare. Nunc varius, nisi at condimentum pulvinar, ante risus elementum enim, vel tempor dui leo eu risus. Phasellus ultricies orci bibendum ante mollis aliquam. Nulla sapien leo, lacinia eu justo mattis, dictum feugiat neque. Sed quis diam massa."
            }
          />
          <Analysis analysis={"Something Here"} />
        </div>

        <div className="flex flex-col gap-4 w-1/2 h-1/2 items-end justify-end align-end ">
          <div className="self-stretch text-[#c4dad2] text-[21px] font-normal font-sans tracking-tighter">
            Treatment:
          </div>

          <div className=" flex-grow rounded-lg  shadow-lg gap-4">
            <Medicine medicine="2g" dosage="5g" />
            <TreamentPlan treatmentPlan="Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment" />
          </div>
        </div>
      </div>

      <div className=" rounded-lg shadow-lg py-4">
        <Consultation />
      </div>
    </div>
  );
}
