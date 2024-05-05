import type { Action, ActionLevel } from "../../types"
import "./Action.css"
import { CardContent, Card, Grid } from "@mui/material"
interface ActionProps {
  action: Action
}
export const ActionDisplay = ({ action }: ActionProps) => {
  const levelCost = (level: ActionLevel) => {
    let out = ""
    if (level.diceCost) {
      out = out.concat(`${level.diceCost.map(num => `${num}+`).join(" and ")}`)
    }
    if (level.tokenCost) {
      const costs = level.tokenCost
        ?.map(
          cost =>
            `${cost.number} ${cost.tokenType} ${cost.number > 1 ? "Tokens" : "Token"}`,
        )
        .join(" or ")
      out = out.concat(costs)
    }
    if (level.otherCost) {
      out = out.concat(`${level.otherCost}`)
    }

    return out
  }
  return (
    <Card className="actionCard">
      <CardContent>
        <h3>{action.name}</h3>

        {action.levels.map(level => (
          <Grid>
            <strong>{levelCost(level)}</strong>: {level.description}
          </Grid>
        ))}
      </CardContent>
    </Card>
  )
}
