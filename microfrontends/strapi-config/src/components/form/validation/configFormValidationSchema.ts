import * as Yup from "yup"

export const configFormValidationSchema = Yup.object().shape({
  connectionUrl: Yup.string()
    .matches(/^https?:\/\/[a-z0-9]+(?:[-.][a-z0-9]+)*(?::[0-9]{1,5})?(?:\/[^\/\r\n]+)*\.[a-z]{2,5}(?:[?#]\S*)?$/, "invalidConfigUrl")
    .required("urlIsRequired"),
  connectionToken: Yup.string().required("tokenIsRequired")
})
