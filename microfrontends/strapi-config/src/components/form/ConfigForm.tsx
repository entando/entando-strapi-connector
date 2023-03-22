import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "../../i18n/use-translation"
import { fetchData } from "../../integration/integration"
import Toast from "../Toast"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface FormData {
  connectionUrl: string
  connectionToken: string
}

interface ToastData {
  message?: string
  type: string
}

const ConfigForm: React.FC = () => {
  const translate = useTranslation()
  const [connectionData, setConnectionData] = useState({
    connectionUrl: "",
    connectionToken: ""
  })
  const [toast, setToast] = useState<ToastData>({
    message: "",
    type: ""
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchConnectionData = async () => {
      const fetchedData = await fetchData(
        `https://davdet.k8s-entando.org/entando-strapi-connector-ce296fd7/strapi-connector-ms/api/strapi/config`
      )
      if (fetchedData.hasOwnProperty("message")) {
        setToast({
          message: translate(fetchedData.message),
          type: "error"
        })
        toastTimeout()
      } else {
        setConnectionData({
          connectionUrl: fetchedData.configUrl,
          connectionToken: fetchedData.token
        })
      }
    }
    fetchConnectionData()
  }, [translate])

  const toastTimeout = () => {
    setShowToast(true)
    window.setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

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
      {showToast && (
        <Toast toastMessage={toast.message} toastStyle={toast.type} />
      )}
    </>
  )
}

export default ConfigForm
