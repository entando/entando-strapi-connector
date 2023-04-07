import React from "react"

interface ToastProps {
  toastStyle: string
  toastMessage?: string | string[]
}

const Toast: React.FC<ToastProps> = ({ toastStyle, toastMessage }) => {
  return (
    <div className="toast toast-top toast-end">
      <div
        className={
          toastStyle === "success"
            ? "alert alert-success"
            : "alert alert-danger"
        }
      >
        {toastStyle === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 stroke-green-600 fill-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill=""
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-11 h-11 stroke-red-600 fill-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {!Array.isArray(toastMessage) ? (
          <p className="text-xl">{toastMessage}</p>
        ) : (
          toastMessage.map((item) => <p>{item}</p>)
        )}
      </div>
    </div>
  )
}

export default Toast
