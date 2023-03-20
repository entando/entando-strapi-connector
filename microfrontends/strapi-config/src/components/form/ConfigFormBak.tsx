import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface valueTypes {
  connectionUrl: string
  connectionToken: string
}

const ConfigFormBak = () => {
  const [connectionData, setConnectionData] = useState({
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

  const FormSubmitHandler = function (values: valueTypes) {
    console.log("submit", values)
  }

  const InitialValues = {
    connectionUrl: connectionData.configUrl,
    connectionToken: connectionData.token
  }

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={FormSubmitHandler}
      enableReinitialize={true}
      validationSchema={configFormValidationSchema}
      isValid
    >
      {(props) => (
        <Form>
          <TextField
            label="Url"
            placeholder="url da inserire"
            name="connectionUrl"
            value={props.values.connectionUrl}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            error={props.errors.connectionUrl}
          />
          <TextField
            label="Token"
            placeholder="token da inserire"
            name="connectionToken"
            value={props.values.connectionToken}
            handleChange={props.handleChange}
            handleBlur={props.handleBlur}
            error={props.errors.connectionToken}
          />
          <button className="btn" type="submit" disabled={!props.isValid}>
            invia
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default ConfigFormBak
