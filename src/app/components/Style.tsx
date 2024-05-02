import * as Mui from "@mui/material"
import { Style } from "../types";

export const StyleDisplay = ({ style, width }: { style: Style; width: number }) => (
    <Mui.Grid item xs={width} className="styleContainer">
        <h4>{style.name}</h4>
        <p>{style.ability.description}</p>
        <p>
            <strong>Range: </strong>
            {style.minRange === style.maxRange
                ? style.minRange
                : `${style.minRange} - ${style.maxRange}`}
        </p>
    </Mui.Grid>
)