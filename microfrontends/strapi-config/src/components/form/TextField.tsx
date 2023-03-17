import { Field } from "formik"
import React, { ChangeEvent } from "react"
import { useIntl } from "react-intl"

interface TextFieldProps {
  label: string
  placeholder: string
  name: string
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: ChangeEvent<HTMLInputElement>) => void
  error: string | undefined
  type: string
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
  error,
  type
}) => {
  const intl = useIntl()

  const getTranslation = (key: string) => {
    return intl.formatMessage({ id: key })
  }

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
      {error && (
        <label className="label">
          <span className="label-text-alt">{getTranslation(error)}</span>
        </label>
      )}
    </>
  )
}

export default TextField
