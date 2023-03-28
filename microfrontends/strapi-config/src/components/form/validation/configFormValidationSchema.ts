import * as Yup from "yup"

export const configFormValidationSchema = Yup.object().shape({
  connectionUrl: Yup.string()
    .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, "invalidConfigUrl")
    .required("urlIsRequired"),
  connectionToken: Yup.string().required("tokenIsRequired")
})
