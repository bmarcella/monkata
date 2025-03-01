import React, { useState } from "react";
import type { Tabs } from "~/configs/menu";


interface TabsProps {
   tabs: Tabs [];
}

export function Tabs ({ tabs = [] }: TabsProps )  {
  const [activeTab, setActiveTab] = useState(0);
  if (tabs.length==0 || !tabs) return null;
  return (
    <div className="w-full">
        <div className="flex border-b border-gray-300">
                {tabs.map((tab, index) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-2 py-2 px-4 text-gray-600 hover:text-blue-500 border-b-2 transition-all duration-300 ${
                    activeTab === index ? "border-blue-500 text-blue-500 font-semibold" : "border-transparent"
                    }`}
                >
                { tab.icon  && <tab.icon className="w-5 h-5" /> }
                    {tab.name}
                </button>
                ))}
            </div>

            { 
            <div className="p-4 bg-white shadow-md rounded-md mt-2">
                { tabs[activeTab].component &&  React.createElement(tabs[activeTab].component) }
            </div> 
            }

    </div>
  );
};

