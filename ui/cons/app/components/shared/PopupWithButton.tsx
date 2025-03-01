import React, { useState } from 'react';
import { PopupWithButtonContent } from './PopupWithButtonContent';

interface PopupProps {
  name: string;
  children: React.ReactNode;
}

export  const  PopupWithButton: React.FC<PopupProps> = ({ name,  children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  return (
    <>
      {/* Overlay */}
      <button
            onClick={() => setIsPopupOpen(true) }
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg
                    hover:bg-blue-700 active:bg-blue-800 transition-colors
                    shadow-lg hover:shadow-xl"
            >
            { name }
     </button>
      {
       isPopupOpen && <PopupWithButtonContent isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}>
          { children }
        </PopupWithButtonContent>
      }

    </>
  );
};

