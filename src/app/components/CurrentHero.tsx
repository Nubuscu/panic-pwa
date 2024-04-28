import * as Mui from "@mui/material"

export const CurrentHero = () => {
  // TODO tabulated section showing the special moves available from the current stance
  // if it's a frantic hero, split the box in half and show styles/forms separately
  return (
    <Mui.Grid item xs={6}>
      <h2>Stances/Unique Actions</h2>
      <Mui.Card>
        Tabulated box for current stance (or parts for frantic)
      </Mui.Card>
    </Mui.Grid>
  )
}
