import React from 'react';
export interface SelectType {
    value: any;
    label: string;
}
interface SelectProps { 
    label: string;
    options: SelectType[];
    value?: any;
    reg?: any;
    onChange: (value: string) => void;
    error?: any
}

const Select = ({ options, onChange = (e: any) => { }, label, reg, error }) => {
    return (
        <div className={'block'}>
            <label className={'block text-sm font-medium text-gray-700'}>{label}</label>
            <select
                className={'mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'}
                {...reg}
                onChange={(e) => onChange(e.target.value)}>
                <option value=''> </option>
                {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className={'text-1xl text-center mt-2 mb-2 text-red-500'}> {error.message} </p>}
        </div>
    );
}

export default Select;
