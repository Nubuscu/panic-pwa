import { CardContent, Card, Grid } from "@mui/material"
import type { Form } from "../../types"
import { CharacterType } from "../../types"
import "./Form.css"

export const FormDisplay = ({
  form,
  width,
  characterType,
}: {
  form: Form
  width: number
  characterType?: CharacterType
}) => (
  <Grid item xs={width}>
    <Card className="formContainer">
      <CardContent>
        <h4>{form.name}</h4>
        <p>{form.ability.description}</p>
        <p>
          <strong>Action Dice: </strong>
          {form.actionDice.join(", ")}
          {characterType === CharacterType.Boss && ", (d4)"}
        </p>
      </CardContent>
    </Card>
  </Grid>
)
