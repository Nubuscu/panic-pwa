import { FormGroup, FormLabel } from "@mui/material"
import { BuildSelector } from "./BuildSelector"
import { useAppSelector } from "../../hooks"
import { ArchetypeSelector, FormSelector, StyleSelector } from "./selectors"

export const StoogeConfig = () => {
  const hero = useAppSelector(state => state.hero.hero)
  return (
    <FormGroup>
      <FormLabel>Build</FormLabel>
      <BuildSelector />
      <FormLabel>Archetype (Super Stooges only)</FormLabel>
      <ArchetypeSelector includeUnselected index={0} />
      <FormLabel>Style</FormLabel>
      <StyleSelector fromArchetypes={[hero.archetypes[0]]} index={0} />
      <FormLabel>Form</FormLabel>
      <FormSelector index={0} />
    </FormGroup>
  )
}
