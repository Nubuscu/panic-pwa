import { BasicActionsList } from "./app/components/BasicActions"
import { ConfigModal } from "./app/components/ConfigModal"
import { CurrentHero } from "./app/components/CurrentHero"
import { StatsTracking } from "./app/components/StatsTracking"
import * as Mui from "@mui/material"

const App = () => {
  return (
    <Mui.Container maxWidth={"xl"} disableGutters={true}>
      <ConfigModal />
      <Mui.Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="top"
        spacing={2}
      >
        <StatsTracking />
        <CurrentHero />
        <BasicActionsList />
      </Mui.Grid>
    </Mui.Container>
  )
}

export default App
