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
import { useEffect } from "react"

const App = () => {
  const hero = useAppSelector(state => state.hero.hero)

  useEffect(() => {
    document.title = `${hero.name} - Panic At The Dojo`
  }, [hero.name])
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth={"xl"} disableGutters>
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
        <footer>
          <Typography variant="caption">
            Found a bug? Report it on <a href="https://github.com/Nubuscu/panic-pwa/issues">Github</a>
          </Typography>
        </footer>
      </Container>
    </StyledEngineProvider>
  )
}

export default App
