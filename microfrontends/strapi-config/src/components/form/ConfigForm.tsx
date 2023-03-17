import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface FormData {
  connectionUrl: string
  connectionToken: string
}

const ConfigForm: React.FC = () => {
  const intl = useIntl()
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
    <>
      <Formik
        initialValues={connectionData}
        validationSchema={configFormValidationSchema}
        enableReinitialize={true}
        onSubmit={formSubmitHandler}
      >
        {(props) => (
          <Form>
            <TextField
              label={intl.formatMessage({ id: "app.connectionUrlLabel" })}
              placeholder={intl.formatMessage({
                id: "app.connectionUrlPlaceholder"
              })}
              name={"connectionUrl"}
              type={"text"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              value={props.values.connectionUrl}
              error={props.errors.connectionUrl}
            />
            <TextField
              label={intl.formatMessage({ id: "app.connectionTokenLabel" })}
              placeholder={intl.formatMessage({
                id: "app.connectionTokenPlaceholder"
              })}
              name={"connectionToken"}
              type={"password"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              value={props.values.connectionToken}
              error={props.errors.connectionToken}
            />
            <button className="btn" type="submit" disabled={!props.isValid}>
              {intl.formatMessage({ id: "app.sendButton" })}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ConfigForm
