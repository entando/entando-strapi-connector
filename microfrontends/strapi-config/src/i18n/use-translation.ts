import { useCallback } from "react"
import { useIntl } from "react-intl"

export const useTranslation = () => {
  const intl = useIntl()

  const translate = useCallback(
    (key: string) => {
      switch (key) {
        case "connectionUrlLabel":
          return intl.formatMessage({
            id: "app.connectionUrlLabel",
            defaultMessage: "Connection URL"
          })
        case "connectionUrlPlaceholder":
          return intl.formatMessage({
            id: "app.connectionUrlPlaceholder",
            defaultMessage: "Insert Strapi URL"
          })
        case "connectionTokenLabel":
          return intl.formatMessage({
            id: "app.connectionTokenLabel",
            defaultMessage: "Connection Token"
          })
        case "connectionTokenPlaceholder":
          return intl.formatMessage({
            id: "app.connectionTokenPlaceholder",
            defaultMessage: "Insert Connection Token"
          })
        case "connectButton":
          return intl.formatMessage({
            id: "app.connectButton",
            defaultMessage: "Connect"
          })
        case "urlIsRequired":
          return intl.formatMessage({
            id: "app.urlIsRequired",
            defaultMessage: "URL field is required"
          })
        case "tokenIsRequired":
          return intl.formatMessage({
            id: "app.tokenIsRequired",
            defaultMessage: "Token field is required"
          })
        case "connectionSuccessfullyEstablished":
          return intl.formatMessage({
            id: "app.connectionSuccessfullyEstablished",
            defaultMessage: "Connection successfully established!"
          })
        case "tokenAlreadySet":
          return intl.formatMessage({
            id: "app.tokenAlreadySet",
            defaultMessage:
              "a token is already set, if you resubmit this form the current token will be overwritten"
          })
        case "invalidConfigUrl":
          return intl.formatMessage({
            id: "app.invalidConfigUrl",
            defaultMessage:
              "the given URL does not belong to a valid Strapi API"
          })
        case "invalidToken":
          return intl.formatMessage({
            id: "app.invalidToken",
            defaultMessage: "the given token is not valid"
          })
        case "invalidTokenPermissions":
          return intl.formatMessage({
            id: "app.invalidTokenPermissions",
            defaultMessage:
              "the given token does not grant permissions to retrieve Contents and/or Collection Types"
          })
      }
    },
    [intl]
  )

  return translate
}
