

import NavBavMenu from "~/components/shared/NavBavMenu";
import PrivateRouteEnt from "./PrivateRouteEnt";
import Sidebar from "~/components/shared/sidebar";


function dashboard() {
  return (
      <div className="flex h-screen">
          <Sidebar />
        
           <main className="flex-1 p-6">
            <NavBavMenu />
              <PrivateRouteEnt/>
            </main>
        </div>
  )
}

export default dashboard