import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "../../i18n/use-translation"
import { getData, postData } from "../../integration/integration"
import Toast from "../Toast"
import TextField from "./TextField"

export interface FormData {
  connectionUrl: string
  connectionToken: string
  isTokenSet?: Boolean
}

interface ToastData {
  message?: string
  type: string
}

interface ConfigFormProps {
  apiUrl: string
}

const ConfigForm: React.FC<ConfigFormProps> = ({ apiUrl }) => {
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
      const response = await getData(`${apiUrl}/api/strapi/config`)
      setConnectionData({
        connectionUrl: response.configUrl,
        connectionToken: "",
        isTokenSet: response.token
      })
    }

    getConnectionData()
  }, [translate, apiUrl])

  useEffect(() => {
    if (toast.message !== "") {
      setShowToast(true)
      const timeoutID = setTimeout(() => {
        setShowToast(false)
        setToast({
          message: "",
          type: ""
        })
      }, 50000)

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

    const response = await postData(`${apiUrl}/api/strapi/config`, dataToSend)

    // fires toasts
    if (response?.errors?.length > 0) {
      const toastStrings = response.errors.map((error: { errorCode: string }) =>
        translate(error.errorCode)
      )
      // const uniqueToastStrings = [...new Set(toastStrings)]
      setToast({
        message: toastStrings,
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
        // validationSchema={configFormValidationSchema}
        // validateOnBlur={true}
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
              value={props.values.connectionUrl}
              error={props.errors.connectionUrl}
            />

            <TextField
              label={translate("connectionTokenLabel")}
              placeholder={translate("connectionTokenPlaceholder")}
              name={"connectionToken"}
              type={"password"}
              handleChange={props.handleChange}
              value={props.values.connectionToken}
              error={props.errors.connectionToken}
              caption={connectionData.isTokenSet ? "tokenAlreadySet" : ""}
            />
            <button className="btn" type="submit" disabled={props.isSubmitting}>
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
