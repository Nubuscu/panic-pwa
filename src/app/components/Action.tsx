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
      out = out.concat(`${level.diceCost.join(" and ")}`)
    }
    if (level.tokenCost) {
      const costs = level.tokenCost
        ?.map(cost => `${cost.number} ${cost.tokenType} token`)
        .join(" or ")
      out = out.concat(costs)
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
