import * as Mui from "@mui/material"
import { basicActions } from "../textContent"
import { ActionDisplay } from "./Action"

export const BasicActionsList = () => {
  return (
    <Mui.Grid item xs={3}>
      <h2>Basic Actions</h2>
      <Mui.Stack spacing={1}>
        {basicActions.map(action => (
          <ActionDisplay action={action} />
        ))}
      </Mui.Stack>
    </Mui.Grid>
  )
}
