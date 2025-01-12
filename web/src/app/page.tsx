"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Consultation from "./components/consultation";
import Summary from "./components/summary";
import TreamentPlan from "./components/treament-plan";
import Medicine from "./components/medicine";

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
      "d604da9-9a81-4ba9-80c2-de3375d59b40'"
    );
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="bg-[#101010] min-h-screen p-6">
      <div className="flex flex-col gap-6">
        <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
          <div className="text-gray-300 text-xl mb-4">Summary:</div>
          <Summary
            summary={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet tortor sit amet suscipit sollicitudin. Donec a tincidunt nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi volutpat ullamcorper urna sed ornare. Nunc varius, nisi at condimentum pulvinar, ante risus elementum enim, vel tempor dui leo eu risus. Phasellus ultricies orci bibendum ante mollis aliquam. Nulla sapien leo, lacinia eu justo mattis, dictum feugiat neque. Sed quis diam massa."
            }
          />
        </div>

        <div className="flex gap-6">
          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg w-1/2">
            <div className="text-gray-300 text-xl mb-4">Treatment:</div>
            <Medicine medicine="2g" dosage="5g" />
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg w-1/2">
            <div className="text-gray-300 text-xl mb-4">Treatment Plan</div>
            <TreamentPlan treatmentPlan="Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment" />
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
          <Consultation />
        </div>
      </div>
    </div>
  );
}
