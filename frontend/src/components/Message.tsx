import React from "react";
import { Alert } from "react-bootstrap";

type MessageProps = { variant: any; children: any };

const Message = ({ variant, children }: MessageProps) => {
    return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
    variant: "info",
};

export default Message;
