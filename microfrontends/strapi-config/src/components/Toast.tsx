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
          toastStyle === "success" ? "alert alert-success" : "alert alert-error"
        }
      >
        <div>
          {!Array.isArray(toastMessage) ? (
            <span>{toastMessage}</span>
          ) : (
            toastMessage.map((item) => <p>{item}</p>)
          )}
        </div>
      </div>
    </div>
  )
}

export default Toast
