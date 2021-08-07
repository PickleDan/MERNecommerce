import React, { ReactChildren } from "react"
import { Alert } from "react-bootstrap"

type MessageProps = {
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
  children: ReactChildren | string
}

const Message = ({ variant, children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: "info",
}

export default Message
