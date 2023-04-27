import { useState, useRef } from "react"

interface Props {
  text?: string
  children: JSX.Element
}

const Tooltip = ({ text, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const toggleTooltip = () => {
    setIsVisible(!isVisible)
  }

  const handleBlur = () => {
    console.log("handleBlur")
    setIsVisible(false)
  }

  return (
    <div className="tooltip">
      <span onClick={toggleTooltip} onBlur={handleBlur}>
        {children}
      </span>
      {isVisible && (
        <div className="tooltip-container" ref={tooltipRef}>
          <div className="arrow"></div>
          <div className="tooltip-text">{text}</div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
