import { Field } from "formik"
import React, { ChangeEvent } from "react"
import { useTranslation } from "../../i18n/use-translation"

interface TextFieldProps {
  label?: string
  placeholder?: string
  name: string
  value: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
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
  error,
  type,
  caption
}) => {
  const translate = useTranslation()

  return (
    <>
      <div className="form-control w-full my-7 ">
        <div className="flex ">
          <div className="w-1/5 ">
            <label className="label justify-end">
              <span className="label-text font-semibold text-xl mr-10">{label}</span>
            </label>
          </div>
          <div className="w-4/5 ">
            <Field
              type={type}
              placeholder={placeholder}
              className="input input-bordered w-full rounded-none text-xl input-md"
              name={name}
              id={name}
              value={value}
              onChange={handleChange}
            />
            <label className="label">
              {error && (
                <span className="label-text-alt text-red-600 text-xl">
                  {translate(error)}
                </span>
              )}
              {caption && (
                <span className="label-text-alt">{translate(caption)}</span>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default TextField
