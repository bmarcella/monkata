import React from "react";
import type { Unity, UnityType } from "../../../../../../../common/memploi/Unity";
import { IconRenderer } from "~/utils/IconRenderer";


const typeColors: Record<UnityType, string> = {
  direction: "bg-blue-500",
  departement: "bg-green-500",
  service: "bg-yellow-500",
  poste: "bg-red-500",
};

const UnityCard: React.FC<{ unity: Unity }> = ({ unity }) => {
  return (
    <div className="max-w-sm w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg">
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${typeColors[unity.type_unity]}`}>
        <span className="text-white text-2xl">{unity.icon && <IconRenderer iconName={unity.icon} ></IconRenderer>}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{unity.name}</h2>
        <p className="text-sm text-gray-500 capitalize">{unity.type_unity}</p>
      </div>
    </div>
    <p className="mt-4 text-gray-600 text-sm">{unity.description}</p>
  </div>
  );
};

export default UnityCard;
