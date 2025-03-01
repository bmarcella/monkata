import { Popup } from "~/components/shared/Popup"
import AddUnity from "../jobs/unity/addUnity"
import EmployeeForm from "./EmployeeForm"
import { useState } from "react";

function PageEmployee() {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    
    <div>
      <main className="flex-1 p-6 block">
         <div className="flex  content-right">
          <button
          onClick={() => setIsPopupOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg
                  hover:bg-blue-700 active:bg-blue-800 transition-colors
                  shadow-lg hover:shadow-xl"
          >
          Add Employee
        </button>
         </div>
          <AddUnity/>
     </main>

      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
      >
       <EmployeeForm/>
      </Popup>
    </div>
  )
}

export default PageEmployee