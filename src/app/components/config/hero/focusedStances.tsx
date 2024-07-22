import { FormControl, FormGroup, FormHelperText, Grid } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { FormSelector, StyleSelector } from "../selectors"
import "./stances.css"

export const FocusedStances = () => {
  const hero = useAppSelector(state => state.hero.hero)
  // All styles come from the same archetype
  const archetypes = [hero.archetypes[0]]
  return (
    <Grid container spacing={1} direction={{ xs: "column", sm: "row" }}>
      {[0, 1, 2].map(i => {
        return (
          <Grid item md={4} sm={12}>
            <FormGroup className="stanceFormGroup">
              <FormControl>
                <StyleSelector fromArchetypes={archetypes} index={i} />
                <FormHelperText>Style {i + 1}</FormHelperText>
              </FormControl>
              <FormControl>
                <FormSelector index={i} />
                <FormHelperText>Form {i + 1}</FormHelperText>
              </FormControl>
            </FormGroup>
          </Grid>
        )
      })}
    </Grid>
  )
}
