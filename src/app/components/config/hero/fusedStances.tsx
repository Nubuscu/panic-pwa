import { FormControl, FormGroup, FormHelperText, Stack } from "@mui/material"
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
    <Stack spacing={1} direction={"row"}>
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
          <FormGroup className="stanceFormGroup">
            <FormControl sx={{ m: 1 }}>
              <StyleSelector fromArchetypes={opts} index={i} />
              <FormHelperText>
                Style {i + 1} {helpText}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormSelector index={i} />
              <FormHelperText>Form {i + 1}</FormHelperText>
            </FormControl>
          </FormGroup>
        )
      })}
    </Stack>
  )
}
