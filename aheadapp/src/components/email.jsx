import * as React from "react";
import { Html, Button } from "@react-email/components";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <div>test d'email</div>
    </Html>
  );
}

export default Email;
