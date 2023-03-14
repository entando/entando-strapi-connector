import { withFormik } from "formik"
import React, { useEffect, useState } from "react"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema.js"

interface FormData {
  configUrl: string
  token: string
}

// chiedere ad irakli come tipizzare le props che arrivano da formik e come risolvere l'errore dell'import dello schema di yup
// cablare i textfield con formik

const ConfigForm: React.FC = ({
  setFieldValue,
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  handleBlur
}) => {
  const [connectionData, setConnectionData] = useState<FormData>({
    configUrl: "",
    token: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetch("./mock/urlFormResponseOK.json")
        .then((res) => res.json())
        .then((data) => data)
      setConnectionData(fetchedData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    setFieldValue("connectionUrl", connectionData.configUrl)
    setFieldValue("connectionToken", connectionData.token)
  }, [connectionData, setFieldValue])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={"Connection URL"}
        placeholder={"Insert URL"}
        name={"connectionUrl"}
        value={values.connectionUrl}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <TextField
        label={"Connection Token"}
        placeholder={"Insert Token"}
        name={"connectionToken"}
        value={values.connectionToken}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
      <button className="btn" type="submit">
        Invia
      </button>
    </form>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    connectionUrl: "",
    connectionToken: ""
  }),
  validationSchema: configFormValidationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  }
})(ConfigForm)