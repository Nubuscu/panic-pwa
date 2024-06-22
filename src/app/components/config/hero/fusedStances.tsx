import { FormControl, FormGroup, FormHelperText, Stack } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { FormSelector, StyleSelector } from "./selectors"

export const FusedStances = () => {
  const hero = useAppSelector(state => state.hero.hero)
  // the hero must have at least one style from each archetype

  return (
    <Stack spacing={1}>
      {/* Stance 0 */}
      <FormGroup row={true} className="stanceFormGroup">
        <FormControl sx={{ m: 1 }}>
          <StyleSelector fromArchetypes={hero.archetypes} index={0} />
          <FormHelperText>
            Style 1 (must be from {hero.archetypes[0].name})
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <FormSelector index={0} />
          <FormHelperText>Form 1</FormHelperText>
        </FormControl>
      </FormGroup>
      {/* Stance 1 */}
      <FormGroup row={true} className="stanceFormGroup">
        <FormControl sx={{ m: 1 }}>
          <StyleSelector fromArchetypes={hero.archetypes} index={1} />
          <FormHelperText>
            Style 2 (may be from {hero.archetypes[0].name} or{" "}
            {hero.archetypes[1].name})
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <FormSelector index={1} />
          <FormHelperText>Form 2</FormHelperText>
        </FormControl>
      </FormGroup>

      {/* Stance 2 */}
      <FormGroup row={true} className="stanceFormGroup">
        <FormControl sx={{ m: 1 }}>
          <StyleSelector fromArchetypes={hero.archetypes} index={2} />
          <FormHelperText>
            Style 3 (must be from {hero.archetypes[1].name})
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <FormSelector index={2} />
          <FormHelperText>Form 3</FormHelperText>
        </FormControl>
      </FormGroup>
    </Stack>
  )
}
