import { FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, MenuItem, Select, Stack, Table, TableCell, TableRow } from "@mui/material"
import { BuildSelector } from "./BuildSelector"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { archetypes, defaultArchetype } from "../../textContent"
import { setArchetype } from "../../../features/hero/heroSlice"
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
