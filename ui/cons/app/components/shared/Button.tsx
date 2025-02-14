import { type ReactNode } from 'react';
import { Log } from '~/utils/auth';

interface ButtonProps {
  design?: BtnUI;
  children?: ReactNode | string;
  typeBtn?: 'button' | 'submit' | 'reset';
  onBtnClick?: (event: MouseEvent) => void;
  disabled?: boolean;
}

export enum BtnUI {
  primary = ' invalid:border-pink-500 invalid:text-pink-600 bg-sky-500/100 hover:bg-sky-500/75 border border-sky-600 focus:outline-sky-500 active:bg-sky-700/75 ',
  secondary = 'bg-gray-500 hover:bg-blue-700',
  success = 'bg-green-500 hover:bg-blue-700',
  danger = 'bg-red-500 hover:bg-blue-700',
  warning = 'bg-yellow-500 hover:bg-blue-700',
  info = 'bg-500 hover:bg-blue-700',
  light = 'bg-500 hover:bg-blue-700',
  dark = 'bg-500 hover:bg-blue-700',
  link = 'bg-500 hover:bg-blue-700',
}

const Button = ({
  children = '',
  design = BtnUI.primary,
  typeBtn = 'button',
  onBtnClick = (e: any) => { Log(e)},  
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
          onClick={(e: any) => {
          onBtnClick(e);
          }}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
