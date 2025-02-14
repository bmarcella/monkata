import { type ReactNode } from 'react';
import { Log } from '~/utils/auth';
import { BtnUI } from './Button';

interface ButtonProps {
  design?: BtnUI;
  children?: ReactNode | string;
  typeBtn?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}


const Submit = ({
  children = '',
  design = BtnUI.primary,
  typeBtn = 'button', 
  disabled = false,
}: ButtonProps) => {
  return (
    <div>
      <button
        disabled = { disabled }
        type={typeBtn}
        className={ ` 
          px-4 py-2 rounded text-white cursor-pointer 
          focus:outline-2 focus:outline-offset-2  
          ${design}` } 
         >
        {children}
      </button>
    </div>
  );
};

export default Submit;
