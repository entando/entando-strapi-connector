import * as Yup from "yup"

export const configFormValidationSchema = Yup.object().shape({
  connectionUrl: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "enterAValidUrl"
    )
    .required("urlIsRequired"),
  connectionToken: Yup.string().required("tokenIsRequired")
})
