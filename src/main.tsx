import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./v1/App"
import { store } from "./v1/app/store"
import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import "./index.css"
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./errorPage"
const container = document.getElementById("root")

if (container) {
  const basePath = "/panic-pwa"
  const root = createRoot(container)
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
    },
    {
      path: basePath,
      loader: async () => {
        return redirect(basePath + "/v1/" + window.location.hash)
      },
    },
    {
      path: basePath + "/v1",
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
    },
    {
      path: basePath + "/v2",
      element: <div>WIP</div>,
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
