

import NavBavMenu from "~/components/shared/NavBavMenu";
import PrivateRouteEnt from "./PrivateRouteEnt";
import Sidebar from "~/routes/dashboard/sidebar";
import { useState } from "react";


function dashboard() {
   const [isOpen, setIsOpen] = useState(true);
   const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (

        <div className="min-h-screen bg-gray-100 flex flex-col">
            
            <NavBavMenu  onToggle={ toggleSidebar  }/>
          
            <div className="flex flex-1">
                <aside  
                  className={`bg-gray-800 text-white ${isOpen ? "w-64" : "w-16"} p-4  transition-all duration-300 ease-in-out transform ${
                    isOpen ? 'translate-x-0 ' : '-translate-x-full'
                  } lg:translate-x-0 `}
                >
                  <Sidebar isOpen={isOpen} />
                </aside>
                <main className="flex-1 p-6 ml-0 transition-all duration-300 ease-in-out">
                    <PrivateRouteEnt/>
                  </main>
              </div>
        </div>
  )
}

export default dashboard