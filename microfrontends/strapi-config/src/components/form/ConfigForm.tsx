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
        `${import.meta.env.STRAPI_CONNECTOR_CONFIG_URL}`
      )
      if (response.hasOwnProperty("message")) {
        setToast({
          message: translate("errorFetchingData"),
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
        setToast({
          message: "",
          type: ""
        })
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
      `${import.meta.env.STRAPI_CONNECTOR_CONFIG_URL}`,
      dataToSend
    )

    if (response.errors) {
      setToast({
        message: translate("somethingWentWrong"),
        type: "error"
      })
    } else {
      setToast({
        message: translate("connectionSuccessfullyEstablished"),
        type: "success"
      })
    }
  }

  return (
    <div className="config-form">
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
    </div>
  )
}

export default ConfigForm
