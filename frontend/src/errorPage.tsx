import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Something went wrong</h1>
      <p>
        v1 of the application should be working at the root path. v2 is heavily
        work-in-progress with the Patch'd Up ruleset, so no guarantees that it's
        working fully.
      </p>
      <p>
        If you'd like to report an error, please do so on{" "}
        <a href="https://github.com/Nubuscu/panic-pwa/issues">Github</a>
      </p>
    </div>
  )
}
