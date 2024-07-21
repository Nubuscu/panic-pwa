import { Grid, Stack } from "@mui/material"
import { basicActions } from "../textContent"
import { ActionDisplay } from "./character/Action"

export const BasicActionsList = () => {
  return (
    <Grid item md={3} sm={12}>
      <h2>Basic Actions</h2>
      <Stack spacing={1}>
        {basicActions.map(action => (
          <ActionDisplay action={action} />
        ))}
      </Stack>
    </Grid>
  )
}
