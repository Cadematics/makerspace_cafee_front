import React, { useState } from "react";
import PetitionForm from "./PetitionForm";
import PetitionMap from "./PetitionMap";

function PetitionSection() {
  const [newSignature, setNewSignature] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Support Our Cause</h2>

      <div className="h-screen flex">
        <div className="w-1/2 sticky top-0">
          <PetitionMap />
        </div>
        <div className="w-1/2 overflow-y-auto p-4 bg-white">
          <PetitionForm />
        </div>
      </div>
    </section>
  );
}

export default PetitionSection;
