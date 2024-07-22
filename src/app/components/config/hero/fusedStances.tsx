import { FormControl, FormGroup, FormHelperText, Grid } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { FormSelector, StyleSelector } from "../selectors"
import "./stances.css"

export const FusedStances = () => {
  const hero = useAppSelector(state => state.hero.hero)
  // the hero must have at least one style from each archetype
  const style0ArchetypeOptions = [hero.archetypes[0]]
  const style1ArchetypeOptions = [hero.archetypes[0], hero.archetypes[1]]
  const style2ArchetypeOptions = [hero.archetypes[1]]

  return (
    <Grid container spacing={1} direction={{ xs: "column", sm: "row" }}>
      {[
        {
          opts: style0ArchetypeOptions,
          helpText: `(must be from ${hero.archetypes[0].name})`,
        },
        {
          opts: style1ArchetypeOptions,
          helpText: `(may be from ${hero.archetypes[0].name} or ${hero.archetypes[1].name})`,
        },
        {
          opts: style2ArchetypeOptions,
          helpText: `(must be from ${hero.archetypes[1].name})`,
        },
      ].map(({ opts, helpText }, i) => {
        return (
          <Grid item md={4} sm={12}>
            <FormGroup className="stanceFormGroup">
              <FormControl>
                <StyleSelector fromArchetypes={opts} index={i} />
                <FormHelperText>
                  Style {i + 1} {helpText}
                </FormHelperText>
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
