import type { Style } from "../../types"
import type { SelectChangeEvent } from "@mui/material"
import { CardContent, Card, Grid, Select, MenuItem } from "@mui/material"
import "./Style.css"
import { useAppSelector } from "../../hooks"
import { useState } from "react"

export const StyleDisplay = ({
  style,
  width,
}: {
  style: Style
  width: number
}) => {
  const [selectedRange, setSelectedRange] = useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRange(event.target.value as string)
  }
  const hero = useAppSelector(state => state.hero.hero)
  const rangeText = (minRange: number, maxRange: number) => {
    return minRange === maxRange ? `${minRange}` : `${minRange} - ${maxRange}`
  }
  let rangeTextOptions = [rangeText(style.minRange, style.maxRange)]
  const selectedForm = hero.forms[hero.selectedFormIndex]
  if (selectedForm.rangeModifiers) {
    selectedForm.rangeModifiers.forEach(modifier => {
      let min = style.minRange
      let max = style.maxRange
      if (modifier.relMaxRange) {
        max += modifier.relMaxRange
      }
      if (modifier.absMinRange) {
        min = modifier.absMinRange
      }
      rangeTextOptions.push(rangeText(min, max))
    })
  }
  rangeTextOptions = [...new Set(rangeTextOptions)]
  return (
    <Grid item xs={width}>
      <Card className="styleContainer">
        <CardContent>
          <h4>{style.name}</h4>
          <p>{style.ability.description}</p>
          <p>
            <strong>Range: </strong>
            <Select
              value={selectedRange}
              label="Range"
              onChange={handleChange}
              defaultValue={rangeTextOptions[0]}
            >
              {rangeTextOptions.map((pair, i) => (
                <MenuItem value={i}>{pair}</MenuItem>
              ))}
            </Select>
          </p>
        </CardContent>
      </Card>
    </Grid>
  )
}
