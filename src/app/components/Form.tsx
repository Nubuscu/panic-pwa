import * as Mui from "@mui/material"
import { Form } from "../types";

export const FormDisplay = ({ form, width }: { form: Form; width: number }) => (
    <Mui.Grid item xs={width} className="formContainer">
        <h4>{form.name}</h4>
        <p>{form.ability.description}</p>
        <p>
            <strong>Action Dice: </strong>
            {form.actionDice.join(", ")}
        </p>
    </Mui.Grid>
)