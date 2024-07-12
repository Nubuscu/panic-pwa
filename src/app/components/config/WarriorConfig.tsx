import { FormControl, FormGroup, FormHelperText, FormLabel, ListSubheader, MenuItem, Select, Stack, Table, TableCell, TableRow } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"

import { ArchetypeSelector, FormSelector, StyleSelector } from "./selectors"



export const WarriorConfig = () => {
  const hero = useAppSelector(state => state.hero.hero)
  return (
    <FormGroup>
      <FormLabel>Archetype</FormLabel>
      <ArchetypeSelector includeBossArchetypes index={0} />
      <FormLabel>Style</FormLabel>
      <StyleSelector fromArchetypes={[hero.archetypes[0]]} index={0} />
      <FormLabel>Form</FormLabel>
      <FormSelector index={0} />
    </FormGroup>
  )
}
