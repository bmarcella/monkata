import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Tabs } from "~/configs/menu";


interface TabsContextType {
  tabs: Tabs[];
  setTabs: React.Dispatch<React.SetStateAction<Tabs[]>>;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tabs []>([]);

  return (
    <TabsContext.Provider value={{ tabs, setTabs}}>
      { children }
    </TabsContext.Provider>
  );
};

// Custom hook to use the alert
export const useTabs = (): TabsContextType => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTab() must be used within an AlertProvider");
  }
  return context;
};
