import {
  Container,
  Grid,
  StyledEngineProvider,
  Typography,
} from "@mui/material"
import { BasicActionsList } from "./app/components/BasicActions"
import { ConfigModal } from "./app/components/ConfigModal"
import { CurrentHero } from "./app/components/CurrentHero"
import { StatsTracking } from "./app/components/StatsTracking"
import { useAppSelector } from "./app/hooks"

const App = () => {
  const hero = useAppSelector(state => state.hero.hero)

  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth={"xl"} disableGutters={true}>
        <Typography variant="h4" align="center">
          {hero.name}
        </Typography>
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
