import React from "react"
import { useTranslation } from "../i18n/use-translation"

const Header: React.FC = () => {
  const translate = useTranslation()

  return (
    <div className="top-container shadow bg-white mb-10 py-10 px-10 border-b-black">
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a>epc</a>
          </li>
          <li>
            <a>Strapi</a>
          </li>
          <li>{translate("title")}</li>
        </ul>
      </div>
      <div className="container-title mb-1 mt-4">
        <p className="text-2xl">
          {translate("title")}
          <div
            className="tooltip tooltip-right"
            data-tip={translate("tooltip")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </p>
      </div>
    </div>
  )
}

export default Header
