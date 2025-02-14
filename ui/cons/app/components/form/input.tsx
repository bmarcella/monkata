import React from 'react'
interface Props {
    label : string,
    type: string,
    name?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    disabled?: boolean,
}
const input = ({ label, type,   placeholder, value, onChange, required , disabled , name } : Props) => {
  return (
    <>
        <div className='mb-2 mt-2'>
            <label className=''  >{ label}</label>
            <input type={type} value={ value } placeholder={ placeholder }  />
        </div>
    </>
  )
}

export default input