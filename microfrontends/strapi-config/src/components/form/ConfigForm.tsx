import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "../../i18n/use-translation"
import Toast from "../Toast"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface FormData {
  connectionUrl: string
  connectionToken: string
}

const ConfigForm: React.FC = () => {
  const translate = useTranslation()
  const [connectionData, setConnectionData] = useState<FormData>({
    connectionUrl: "",
    connectionToken: ""
  })
  const [dataIsSent, setDataIsSent] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)

  // const queryString = window.location.hostname
  // const protocol = window.location.protocol
  // "https://dminnai.k8s-entando.org/entando-strapi-connector-b26b60ed/strapi-connector-ms/api/strapi/config"

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetch(
        `${window.location.origin}/entando-strapi-connector-b26b60ed/strapi-connector-ms/api/strapi/config`
      )
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error("Errore")
        })
        .then((data) => data)
        .catch((error) => setError(true))
      setConnectionData({
        connectionUrl: fetchedData.configUrl,
        connectionToken: fetchedData.token
      })
    }
    fetchData()
  }, [])

  const formSubmitHandler = (values: FormData) => {
    console.log(values)
    setDataIsSent(true)
    window.setTimeout(() => {
      setDataIsSent(false)
    }, 5000)
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
              label={translate("connectionUrlLabel")}
              placeholder={translate("connectionUrlPlaceholder")}
              name={"connectionUrl"}
              type={"text"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              value={props.values.connectionUrl}
              error={props.errors.connectionUrl}
            />

            <TextField
              label={translate("connectionTokenLabel")}
              placeholder={translate("connectionTokenPlaceholder")}
              name={"connectionToken"}
              type={"password"}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
              value={props.values.connectionToken}
              error={props.errors.connectionToken}
            />
            <button className="btn" type="submit" disabled={!props.isValid}>
              {translate("connectButton")}
            </button>
          </Form>
        )}
      </Formik>
      {error && (
        <Toast
          toastMessage="Cannot retrieve data from server, Connection URL & Token "
          toastStyle="error"
        />
      )}
    </>
  )
}

export default ConfigForm
