import { useState } from 'react';
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuthEnt } from '~/routes/AuthEntProvider';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState<any>({});
    const { menuItems } = useAuthEnt();
    console.log(menuItems);
    const toggleSubMenu = (index: number) => {
        setOpenMenus((prev: any) => ({ ...prev, [index]: !prev[index] }));
    };
    return (
        <div className={`bg-gray-900 text-white ${isOpen ? "w-64" : "w-16"} h-screen transition-all duration-300 p-4`}>
            <button
                className={'mb-6 p-2 rounded bg-gray-700 hover:bg-gray-600'}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>
            <ul>
                {menuItems.map(({ name, icon, submenu }, index) => (
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
                                        className={'p-2 hover:bg-gray-700 rounded cursor-pointer flex justify-between'}
                                    >
                                        <NavLink to={sub.url} className={({ isActive }) => (isActive ? 'active' : '')}>
                                            <span>{sub.name}</span>
                                        </NavLink>
                                        {sub.icon &&
                                            React.createElement(sub.icon, { className: 'w-4 h-4' })}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;