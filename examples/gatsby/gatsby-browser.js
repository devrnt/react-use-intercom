import React from "react";
import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = "jcabc7e3";

export const wrapRootElement = ({ element }) => (
  <IntercomProvider appId={INTERCOM_APP_ID}>{element}</IntercomProvider>
);
