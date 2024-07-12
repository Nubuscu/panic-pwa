import { FormControl, FormGroup, FormHelperText, MenuItem, Select, Stack, Table, TableCell, TableRow } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { archetypes, bossArchetypes } from "../../textContent"
import { setArchetype, setType } from "../../../features/hero/heroSlice"
import { HeroType } from "../../types"
import { FormSelector, StyleSelector } from "./selectors"

const ArchetypeSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const options = [...archetypes, ...bossArchetypes]

  return (
    <Select
      value={hero.archetypes[0].name}
      onChange={e => {
        dispatch(
          setArchetype({
            archetypeName: e.target.value,
            number: 0,
          }),
          dispatch(setType(HeroType.Fused)),
        )
      }}
    >
      {options.map(arch => (
        <MenuItem key={arch.name} value={arch.name}>
          {arch.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export const WarriorConfig = () => {
  const hero = useAppSelector(state => state.hero.hero)
  return (
    <Table>
      <TableRow>
        <TableCell align="right">Archetype: </TableCell>
        <TableCell>
          <ArchetypeSelector />
        </TableCell>
      </TableRow>
      <TableRow>
        <Stack spacing={1} direction={"row"}>
          <FormGroup className="stanceFormGroup">
            <FormControl sx={{ m: 1 }}>
              <StyleSelector fromArchetypes={[hero.archetypes[0]]} index={0} />
              <FormHelperText>Style 1</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormSelector index={0} />
              <FormHelperText>Form 1</FormHelperText>
            </FormControl>
          </FormGroup>
        </Stack>
      </TableRow>
    </Table>
  )
}
