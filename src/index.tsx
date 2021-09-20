import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./index.styles";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://4fa31de280d6409198bec1f0abaac4c9@o1006837.ingest.sentry.io/5967193",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
