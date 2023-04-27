import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useTranslation } from "../../i18n/use-translation"
import { getData, postData } from "../../integration/integration"
import Toast from "../Toast"
import TextField from "./TextField"
import Warning from "../Warning"

export interface FormData {
  connectionUrl: string
  connectionToken: string
  isTokenSet?: Boolean
}

interface ToastData {
  message?: string | string[]
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
  const [configUrlValidationError, setConfigUrlValidationError] = useState("")
  const [tokenValidationError, setTokenValidationError] = useState("")

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
      }, 5000)

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [toast.message])

  const formSubmitHandler = async (values: FormData) => {
    resetErrors()

    const dataToSend = {
      configUrl: values.connectionUrl,
      token: values.connectionToken
    }

    if (dataToSend.configUrl?.length === 0 && dataToSend.token?.length === 0) {
      setToast({
        message: translate("mandatory"),
        type: "error"
      })
      setConfigUrlValidationError("urlIsRequired")
      setTokenValidationError("tokenIsRequired")
      return
    }

    const response = await postData(`${apiUrl}/api/strapi/config`, dataToSend)

    if (response?.errors?.length > 0) {
      const toastStrings = response.errors.map(
        (error: { field: string; errorCode: string }) =>
          translate(error.errorCode)
      ) as string[]
      const uniqueToastStrings = [...new Set(toastStrings)] as string[]
      setToast({
        message: uniqueToastStrings,
        type: "error"
      })

      response.errors.forEach((error: { field: string; errorCode: string }) => {
        if (error.field === "configUrl") {
          if (error.errorCode === "mandatory") {
            setConfigUrlValidationError("urlIsRequired")
          } else {
            setConfigUrlValidationError(error.errorCode)
          }
        }
        if (error.field === "token") {
          if (error.errorCode === "mandatory") {
            setTokenValidationError("tokenIsRequired")
          } else {
            setTokenValidationError(error.errorCode)
          }
        }
      })
    } else {
      setToast({
        message: translate("connectionSuccessfullyEstablished"),
        type: "success"
      })

      resetErrors()
    }
  }

  const resetErrors = () => {
    setConfigUrlValidationError("")
    setTokenValidationError("")
  }

  // console.log("URL", configUrlValidationError)
  // console.log("TKN", tokenValidationError)

  return (
    <div className="config-form">
      <div className="form-container my-1 mx-4">
        <div className="p-10 border border-gray bg-white">
          {connectionData.isTokenSet && (
            <Warning message={translate("tokenAlreadySet")} />
          )}
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
                  error={
                    configUrlValidationError.length > 0
                      ? configUrlValidationError
                      : ""
                  }
                />

                <TextField
                  label={translate("connectionTokenLabel")}
                  placeholder={translate("connectionTokenPlaceholder")}
                  name={"connectionToken"}
                  type={"password"}
                  handleChange={props.handleChange}
                  value={props.values.connectionToken}
                  error={
                    tokenValidationError.length > 0 ? tokenValidationError : ""
                  }
                />
                <button
                  className="btn rounded-none bg-blue-900 text-xl text-white"
                  type="submit"
                  disabled={props.isSubmitting}
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
      </div>
    </div>
  )
}

export default ConfigForm
