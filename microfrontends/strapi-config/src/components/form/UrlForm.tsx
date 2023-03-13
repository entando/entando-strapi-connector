import { withFormik } from "formik"
import React, { useEffect, useState } from "react"
import TextField from "./TextField"
import { urlFormValidationSchema } from "./validation/urlFormValidationSchema.js"

interface FormData {
  configUrl: string
  token: string
}

// chiedere ad irakli come tipizzare le props che arrivano da formik e come risolvere l'errore dell'import dello schema di yup
// cablare i textfield con formik

const UrlForm: React.FC = (props) => {
  const {
    setFieldValue,
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur
  } = props

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
      />
      <TextField
        label={"Connection Token"}
        placeholder={"Insert Token"}
        name={"connectionToken"}
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
  validationSchema: urlFormValidationSchema,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  }
})(UrlForm)
