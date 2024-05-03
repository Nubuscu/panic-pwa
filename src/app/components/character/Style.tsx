import type { Style } from "../../types"
import { CardContent, Card, Grid } from "@mui/material"
import "./Style.css"

export const StyleDisplay = ({
  style,
  width,
}: {
  style: Style
  width: number
}) => (
  <Grid item xs={width}>
    <Card className="styleContainer">
      <CardContent>
        <h4>{style.name}</h4>
        <p>{style.ability.description}</p>
        <p>
          <strong>Range: </strong>
          {style.minRange === style.maxRange
            ? style.minRange
            : `${style.minRange} - ${style.maxRange}`}
        </p>
      </CardContent>
    </Card>
  </Grid>
)
