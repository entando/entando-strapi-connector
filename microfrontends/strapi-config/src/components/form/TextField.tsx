import React from "react"

interface TextFieldProps {
  label: string
  placeholder: string
  name: string
}

const TextField: React.FC<TextFieldProps> = ({ label, placeholder, name }) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        name={name}
        id={name}
      />
    </>
  )
}

export default TextField
