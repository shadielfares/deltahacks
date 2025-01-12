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
    <div className="bg-[#101010] min-h-screen p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Summary Section */}
        <Summary summary={data} />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg flex-1">
            <div className="text-gray-300 text-xl mb-4">Medicine</div>
            <Medicine medicine="2g" dosage="5g" />
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-2 shadow-lg flex-1">
            <TreamentPlan treatmentPlan="Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment Treatment" />
          </div>
        </div>

        {/* Consultation Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-8 shadow-lg">
          <Consultation />
        </div>
      </div>
    </div>
  );
}
