import { Field } from "formik"
import React from "react"

interface TextFieldProps {
  label: string
  placeholder: string
  name: string
  value: string
  handleChange: () => void
  handleBlur: () => void
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur
}) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Field
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  )
}

export default TextField
