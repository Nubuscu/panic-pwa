import { FormControl, FormGroup, FormHelperText, Stack } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { FormSelector, StyleSelector } from "./selectors"

export const FocusedStances = () => {
  const hero = useAppSelector(state => state.hero.hero)
  // All styles come from the same archetype
  const archetypes = [hero.archetypes[0]]
  return (
    <Stack spacing={1}>
      {[0, 1, 2].map(i => {
        return (
          <FormGroup row={true} className="stanceFormGroup">
            <FormControl sx={{ m: 1 }}>
              <StyleSelector fromArchetypes={archetypes} index={i} />
              <FormHelperText>Style {i + 1}</FormHelperText>
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
