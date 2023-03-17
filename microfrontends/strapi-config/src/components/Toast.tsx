import React from "react"

interface ToastProps {
  toastStyle: string
  toastMessage: string
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
          <span>{toastMessage}</span>
        </div>
      </div>
    </div>
  )
}

export default Toast

// `alert alert-${toastStyle}`
