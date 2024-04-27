import { ConfigModal } from "./app/components/ConfigModal"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import * as Mui from '@mui/material'

const App = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  return (
    <Mui.Container>
      <ConfigModal />
      <Mui.Grid container direction="row" justifyContent="center" alignItems="center" columns={3} spacing={2}>
        <Mui.Grid item xs >
          <Mui.Card>
            In-game stats tracking goes here
          </Mui.Card>
        </Mui.Grid>
        <Mui.Grid item xs >
          <Mui.Card>
            Tabulated box for current stance (or parts for frantic)
          </Mui.Card>
        </Mui.Grid>
        <Mui.Grid item xs >
          <Mui.Card>
            Basic Actions go here
          </Mui.Card>
        </Mui.Grid>
      </Mui.Grid>

    </Mui.Container>
  )
}

export default App
