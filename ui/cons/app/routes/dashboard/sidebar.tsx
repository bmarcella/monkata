import { useState } from 'react';
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuthEnt } from '~/providers/AuthEntProvider';
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useTabs } from '~/providers/TabsProvider';
interface Props {
    isOpen: boolean;
}
function Sidebar( { isOpen }: Props) {
   
    const [openMenus, setOpenMenus] = useState<any>({});
    const { menuItems } = useAuthEnt()  as any;
    const { setTabs } = useTabs() as any;
    const navigate = useNavigate();
    const toggleSubMenu = (index: number) => {
        setOpenMenus((prev: any) => ({ ...prev, [index]: !prev[index] }));
    };
    const goTo = (url : string, tabs) =>{
        setTabs(tabs);
        navigate(url);
    }
    return (
        <nav >
        
            <ul>
                {menuItems.map(({ name, icon, prefix, submenu }, index) => (
                    <li key={index}>
                        <div
                            className={`flex ${isOpen ? 'items-center justify-between gap-4 p-3' : ''} hover:bg-gray-800 rounded cursor-pointer`}
                            onClick={() => submenu && toggleSubMenu(index)}
                        >
                            {isOpen && <span className={'flex-1'}>{name}</span>}
                            {icon &&
                                React.createElement(icon, {
                                    className: 'transition-all duration-200',
                                    style: {
                                        width: isOpen ? '24px' : '32px',
                                        height: isOpen ? '24px' : '32px',
                                        marginBottom: isOpen ? '0px' : '5%'
                                    },
                                })}
                        </div>
                        {submenu && openMenus[index] && isOpen && (
                            <ul className={'pl-8'}>
                                {submenu.map((sub, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className={'p-2 hover:bg-gray-700 rounded cursor-pointer flex justify-between transition-all duration-300 ease-in-out transform'}
                                    >
                                        <div onClick={ () => { goTo(prefix+sub.url, sub.tabs ) } }>
                                            <span>{sub.name}</span>
                                        </div>
                                        {sub.icon &&
                                            React.createElement(sub.icon, { className: 'w-4 h-4' })}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;