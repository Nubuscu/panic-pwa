import { FormControl, FormGroup, FormHelperText, Stack } from "@mui/material"
import { useAppSelector } from "../../../hooks"
import { FormSelector, StyleSelector } from "./selectors"
import { archetypes, defaultArchetype } from "../../../textContent"
import type { Archetype } from "../../../types"
import "./stances.css"

export const FranticStances = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const nonDefaultUnselected = (archetypes: Archetype[], index: number) => {
    const nonDefault = archetypes.filter(a => a !== defaultArchetype)
    const otherSelectedArchetypeNames = hero.styles
      .filter((_style, i) => i !== index)
      .map(s => s.parentArchetypeName)
    return nonDefault.filter(
      arch => !otherSelectedArchetypeNames.includes(arch.name),
    )
  }
  const style0ArchetypeOptions = nonDefaultUnselected(hero.archetypes, 0)
  const style1ArchetypeOptions = nonDefaultUnselected(hero.archetypes, 1)
  const style2ArchetypeOptions = nonDefaultUnselected(archetypes, 2)
  return (
    <Stack spacing={1} direction={"row"}>
      {[
        {
          opts: style0ArchetypeOptions,
          helpText: "(may be from any of the selected archetypes)",
        },
        {
          opts: style1ArchetypeOptions,
          helpText: "(may be from any of the selected archetypes)",
        },
        {
          opts: style2ArchetypeOptions,
          helpText: "(may be from any archetype not already in use)",
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
