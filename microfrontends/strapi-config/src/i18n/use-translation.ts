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
        case "enterAValidUrl":
          return intl.formatMessage({
            id: "app.enterAValidUrl",
            defaultMessage: "Enter a valid URL"
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
        case "errorFetchingData":
          return intl.formatMessage({
            id: "app.errorFetchingData",
            defaultMessage: "Error while fetching data"
          })
      }
    },
    [intl]
  )

  return translate
}
