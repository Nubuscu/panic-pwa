import { MenuItem, Select, Table, TableCell, TableRow } from "@mui/material"
import { BuildSelector } from "./BuildSelector"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { archetypes, defaultArchetype, forms, styles } from "../../textContent"
import {
  setArchetype,
  setForm,
  setStyle,
} from "../../../features/hero/heroSlice"

const ArchetypeSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const options = [defaultArchetype, ...archetypes]

  return (
    <Select
      value={hero.archetypes[0].name}
      onChange={e => {
        dispatch(
          setArchetype({
            archetypeName: e.target.value,
            number: 0,
          }),
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

const FormSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const form = hero.forms[0]
  return (
    <Select
      value={form.name}
      onChange={e => {
        dispatch(setForm({ formName: e.target.value, number: 0 }))
      }}
    >
      {forms.map(f => (
        <MenuItem key={f.name} value={f.name}>
          {f.name}
        </MenuItem>
      ))}
    </Select>
  )
}
const StyleSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  return (
    <Select
      value={hero.styles[0].name}
      onChange={e => {
        dispatch(setStyle({ styleName: e.target.value, number: 0 }))
      }}
    >
      {styles.map(s => (
        <MenuItem key={s.name} value={s.name}>
          {s.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export const StoogeConfig = () => {
  return (
    <Table>
      <TableRow>
        <TableCell align="right">Build:</TableCell>
        <TableCell>
          <BuildSelector />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="right">Archetype (Super Stooges only): </TableCell>
        <TableCell>
          <ArchetypeSelector />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="right">Style: </TableCell>
        <TableCell>
          <StyleSelector />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="right">Form: </TableCell>
        <TableCell>
          <FormSelector />
        </TableCell>
      </TableRow>
    </Table>
  )
}
