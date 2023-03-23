import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "../../i18n/use-translation"
import { getData, postData } from "../../integration/integration"
import Toast from "../Toast"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

export interface FormData {
  connectionUrl: string
  connectionToken: string
  isTokenSet?: Boolean
}

interface ToastData {
  message?: string
  type: string
}

const ConfigForm: React.FC = () => {
  const translate = useTranslation()
  const [connectionData, setConnectionData] = useState({
    connectionUrl: "",
    connectionToken: "",
    isTokenSet: false
  })
  const [toast, setToast] = useState<ToastData>({
    message: "",
    type: ""
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const getConnectionData = async () => {
      const response = await getData(
        `https://davdet.k8s-entando.org/entando-strapi-connector-ce296fd7/strapi-connector-ms/api/strapi/config0`
      )
      if (response.hasOwnProperty("message")) {
        setToast({
          message: translate(response.message),
          type: "error"
        })
      } else {
        setConnectionData({
          connectionUrl: response.configUrl,
          connectionToken: "",
          isTokenSet: response.token
        })
      }
    }

    getConnectionData()
  }, [translate])

  useEffect(() => {
    if (toast.message !== "") {
      setShowToast(true)
      const timeoutID = setTimeout(() => {
        setShowToast(false)
      }, 5000)

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [toast.message])

  const formSubmitHandler = async (values: FormData) => {
    const dataToSend = {
      configUrl: values.connectionUrl,
      token: values.connectionToken
    }

    const response = await postData(
      `https://davdet.k8s-entando.org/entando-strapi-connector-ce296fd7/strapi-connector-ms/api/strapi/config`,
      dataToSend
    )

    if (response.errors) {
      console.log("KO")
      setToast({
        message: translate("somethingWentWrong"),
        type: "error"
      })
    } else {
      console.log("OK")
      setToast({
        message: translate("connectionSuccessfullyEstablished"),
        type: "success"
      })
    }
  }

  return (
    <>
      0.0.18
      <Formik
        initialValues={connectionData}
        validationSchema={configFormValidationSchema}
        enableReinitialize={true}
        onSubmit={formSubmitHandler}
        // validateOnMount={true}
        validateOnBlur={true}
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
              caption={connectionData.isTokenSet ? "tokenIsPresent" : ""}
            />
            <button
              className="btn"
              type="submit"
              disabled={!(props.isValid && props.dirty)}
            >
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
