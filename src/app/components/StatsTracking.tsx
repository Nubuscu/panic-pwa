import {
  Grid,
  TableContainer,
  TableBody,
  Table,
  TableRow,
  TableCell,
  Card,
  Tooltip,
  Typography,
  Button,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  setChallengedBy,
  setChallenging,
  setExtraShields,
  setHealth,
  setHealthBars,
  setShields,
  setToken,
} from "../../features/hero/gameStateSlice"
import type { TokenDisplay } from "../types"
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit"

const Explainer = ({ helpText }: { helpText: string }) => {
  return (
    <Tooltip title={helpText}>
      <Typography variant="subtitle2" component={"span"}>
        (?)
      </Typography>
    </Tooltip>
  )
}
const NumberInput = ({
  value,
  updateThunk,
}: {
  value: number
  updateThunk: ActionCreatorWithPayload<number, any>
}) => {
  const dispatch = useAppDispatch()
  return (
    <>
      {value}
      <Button onClick={e => dispatch(updateThunk(value + 1))}>+</Button>
      <Button onClick={e => dispatch(updateThunk(Math.max(value - 1, 0)))}>
        -
      </Button>
    </>
  )
}
const TokenInput = ({ type, value }: { type: string; value: number }) => {
  const dispatch = useAppDispatch()
  return (
    <>
      {value}
      <Button
        onClick={e => dispatch(setToken({ type: type, value: value + 1 }))}
      >
        +
      </Button>
      <Button
        onClick={e =>
          dispatch(setToken({ type: type, value: Math.max(value - 1, 0) }))
        }
      >
        -
      </Button>
    </>
  )
}
export const StatsTracking = () => {
  const gameState = useAppSelector(state => state.hero.gameState)
  const dispatch = useAppDispatch()

  const tokenRows = Object.entries(gameState.tokens).map(
    ([key, value]: [string, TokenDisplay]) => (
      <TableRow>
        <TableCell align="right">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)} Tokens</strong>{" "}
          <Explainer helpText={value.helpText} />
        </TableCell>
        <TableCell align="right">
          <TokenInput type={key} value={value.value} />
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
              <TableCell align="right">
                Health
                <Explainer helpText="The number of hit points remaining in the current health bar" />
              </TableCell>
              <TableCell align="right">
                <NumberInput value={gameState.health} updateThunk={setHealth} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                Health Bars
                <Explainer helpText="The number of extra health bars the character has" />
              </TableCell>
              <TableCell align="right">
                <NumberInput
                  value={gameState.healthBars}
                  updateThunk={setHealthBars}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                Current Shield
                <Explainer helpText="Hit point amount of shield. Shields cannot be healed or added to, only replaced." />
              </TableCell>
              <TableCell align="right">
                <NumberInput
                  value={gameState.shields}
                  updateThunk={setShields}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                Extra Shields
                <Explainer helpText="Extra shields (i.e. from the Zen form)" />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={gameState.extraShields}
                  onChange={e => dispatch(setExtraShields(e.target.value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                Challenging
                <Explainer helpText="Enemies that you have given a challenge token (can be 1 or more)" />
              </TableCell>
              <TableCell align="right">
                <input
                  type="text"
                  value={gameState.challenging}
                  onChange={e => dispatch(setChallenging(e.target.value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                Challenged By
                <Explainer helpText="The enemy you have been challenged by. Receiving a new challenge token removes the previous one, if any." />
              </TableCell>
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
