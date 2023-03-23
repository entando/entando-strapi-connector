import { Field } from "formik"
import React, { ChangeEvent } from "react"
import { useTranslation } from "../../i18n/use-translation"

interface TextFieldProps {
  label?: string
  placeholder?: string
  name: string
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type: string
  caption?: string
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
  error,
  type,
  caption
}) => {
  const translate = useTranslation()

  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Field
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label className="label">
        {error && <span className="label-text-alt">{translate(error)}</span>}
        {caption && (
          <span className="label-text-alt">{translate(caption)}</span>
        )}
      </label>
    </>
  )
}

export default TextField
