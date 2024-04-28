import { Action, ActionLevel } from "../types"
import * as Mui from "@mui/material"

interface ActionProps {
  action: Action
}
export const ActionDisplay = ({ action }: ActionProps) => {
  const levelCost = (level: ActionLevel) => {
    // TODO prettier formatting
    let out = ""
    if (level.diceCost) {
      out = out.concat(`${level.diceCost}`)
    }
    if (level.tokenCost) {
      out = out.concat(`${level.tokenCost}`)
    }
    if (level.otherCost) {
      out = out.concat(`${level.otherCost}`)
    }

    return out
  }
  return (
    <Mui.Card>
      <h3>{action.name}</h3>
      {action.levels.map(level => (
        <Mui.Grid>
          <strong>{levelCost(level)}</strong>: {level.description}
        </Mui.Grid>
      ))}
    </Mui.Card>
  )
}
