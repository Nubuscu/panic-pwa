import {
  Grid,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Card,
  TableHead,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  setChallengedBy,
  setChallenging,
  setHealth,
  setHealthBars,
  setShields,
  setToken,
} from "../../features/hero/gameStateSlice"
import { TokenDisplay } from "../types"

export const StatsTracking = () => {
  const gameState = useAppSelector(state => state.hero.gameState)
  const dispatch = useAppDispatch()

  const tokenRows = Object.entries(gameState.tokens).map(
    ([key, value]: [string, TokenDisplay]) => (
      <TableRow>
        <TableCell align="right">
          <strong>{key}</strong>
          <br /> {value.helpText}
        </TableCell>
        <TableCell align="right">
          <input
            type="number"
            value={value.value}
            onChange={e =>
              dispatch(
                setToken({
                  type: key,
                  value: parseInt(e.target.value),
                }),
              )
            }
          />
        </TableCell>
      </TableRow>
    ),
  )
  return (
    <Grid item xs={3}>
      <h2>Character Stats</h2>
      <TableContainer component={Card}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Health</TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  value={gameState.health}
                  onChange={e => dispatch(setHealth(parseInt(e.target.value)))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Health Bars</TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  value={gameState.healthBars}
                  onChange={e =>
                    dispatch(setHealthBars(parseInt(e.target.value)))
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Current Shield</TableCell>
              <TableCell align="right">
                <input
                  type="number"
                  value={gameState.shields}
                  onChange={e => dispatch(setShields(parseInt(e.target.value)))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Challenging (1+ enemies)</TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={gameState.challenging}
                  onChange={e => dispatch(setChallenging(e.target.value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Challenged By (single enemy)</TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={gameState.challengedBy}
                  onChange={e => dispatch(setChallengedBy(e.target.value))}
                />
              </TableCell>
            </TableRow>
            {tokenRows}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}
