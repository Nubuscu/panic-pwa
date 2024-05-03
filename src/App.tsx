import { Container, Grid, StyledEngineProvider } from "@mui/material"
import { BasicActionsList } from "./app/components/BasicActions"
import { ConfigModal } from "./app/components/ConfigModal"
import { CurrentHero } from "./app/components/CurrentHero"
import { StatsTracking } from "./app/components/StatsTracking"

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth={"xl"} disableGutters={true}>
        <ConfigModal />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="top"
          spacing={2}
        >
          <StatsTracking />
          <CurrentHero />
          <BasicActionsList />
        </Grid>
      </Container>
    </StyledEngineProvider>
  )
}

export default App
