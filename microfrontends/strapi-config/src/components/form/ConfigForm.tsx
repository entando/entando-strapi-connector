import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { useTranslation } from "../../i18n/use-translation"
import Toast from "../Toast"
import TextField from "./TextField"
import { configFormValidationSchema } from "./validation/configFormValidationSchema"

interface FormData {
  connectionUrl: string
  connectionToken: string
}

const ConfigForm: React.FC = () => {
  const intl = useIntl()
  const translate = useTranslation()
  const [connectionData, setConnectionData] = useState<FormData>({
    connectionUrl: "",
    connectionToken: ""
  })
  const [dataIsSent, setDataIsSent] = useState<Boolean>(false)

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
            {/* <TextField
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
            /> */}

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
      {dataIsSent && <Toast toastMessage="Data is sent" toastStyle="success" />}
    </>
  )
}

export default ConfigForm
