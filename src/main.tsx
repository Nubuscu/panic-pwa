import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./v1/App"
import AppV2 from "./v2/App"
import { store } from "./v1/app/store"
import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import "./index.css"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./errorPage"
import { storeV2 } from "./v2/store"
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  const router = createHashRouter([
    {
      // optional state variable. v1 doesn't use it directly, this just stops react-router trying to navigate to a random b64 string.
      path: "/:state?",
      errorElement: <ErrorPage />,
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
    },
    {
      path: "/v2",
      element: (
        <Provider store={storeV2}>
          <AppV2 />
        </Provider>
      ),
    },
  ])
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
