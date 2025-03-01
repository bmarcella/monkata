import { X } from "lucide-react";

interface PopupProps {
  children: React.ReactNode;
  isPopupOpen: boolean;
  setIsPopupOpen : (valeu: boolean)=>void;
}
export const PopupWithButtonContent: React.FC<PopupProps> = ({ isPopupOpen, setIsPopupOpen, children }) => {

    return (
        <> 
        <div  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsPopupOpen(false) } />

    {/* Popup */}
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-2xl z-50 overflow-auto">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsPopupOpen(false) }
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        
        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
        </>
     
    )
    

}