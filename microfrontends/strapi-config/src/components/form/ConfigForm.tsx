import { FormikProps, Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface FormData {
  connectionUrl: string
  connectionToken: string
}

const ConfigForm: React.FC = () => {
  const [connectionData, setConnectionData] = useState<FormData>({
    connectionUrl: "",
    connectionToken: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetch("./mock/urlFormResponseOK.json")
        .then((res) => res.json())
        .then((data) => data)
      setConnectionData({
        connectionUrl: fetchedData.configUrl,
        connectionToken: fetchedData.token
      })
    }

    fetchData()
  }, [])

  const formSubmitHandler = (values: FormData) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={connectionData}
      validationSchema={configFormValidationSchema}
      enableReinitialize={true}
      onSubmit={formSubmitHandler}
    >
      {(props) => (
        <Form>
          <TextField
            label={"Connection URL"}
            placeholder={"Insert URL"}
            name={"connectionUrl"}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            value={props.values.connectionUrl}
          />
          <TextField
            label={"Connection Token"}
            placeholder={"Insert Token"}
            name={"connectionToken"}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            value={props.values.connectionToken}
          />
          <button className="btn" type="submit">
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ConfigForm
