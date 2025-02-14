
import NavBavMenu from "~/components/shared/NavBavMenu";
import PrivateRouteEmploi from "./PrivateRouteEmploi";
import Sidebar from "~/components/shared/sidebar";

function memploi() {
  return (
       <div className="flex h-screen">
          <Sidebar />
           <main className="flex-1 p-6">
             <NavBavMenu />
             <PrivateRouteEmploi/>
            </main>
        </div>
  )
}

export default memploi;