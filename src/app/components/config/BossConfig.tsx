import {
  Divider,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import type { Form, Style } from "../../types"
import { HeroType } from "../../types"
import {
  setArchetype,
  setForm,
  setStyle,
  setType,
} from "../../../features/hero/heroSlice"
import { archetypes, defaultArchetype, forms, styles } from "../../textContent"
import { BuildSelector } from "./BuildSelector"

const ArchetypeSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const options = [...archetypes]
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

const StyleSelectors = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const handleDisabled = (style: Style) => hero.styles.includes(style)

  return hero.styles.map((style, i) => (
    <TableCell align="center">
      <Select
        value={style.name}
        onChange={e => {
          dispatch(setStyle({ styleName: e.target.value, number: i }))
        }}
      >
        {styles.map(s => (
          <MenuItem key={s.name} value={s.name} disabled={handleDisabled(s)}>
            {s.name}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  ))
}

const FormSelectors = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const handleDisabled = (form: Form) => hero.forms.includes(form)

  return hero.forms.map((form, i) => (
    <TableCell align="center">
      <Select
        value={form.name}
        onChange={e => {
          dispatch(setForm({ formName: e.target.value, number: i }))
        }}
      >
        {forms.map(f => (
          <MenuItem key={f.name} value={f.name} disabled={handleDisabled(f)}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  ))
}
export const BossConfig = () => {
  return (
    <>
      <Table>
        <TableRow>
          <TableCell align="right">Build:</TableCell>
          <TableCell>
            <BuildSelector />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Archetype:</TableCell>
          <TableCell>
            <ArchetypeSelector />
          </TableCell>
        </TableRow>
      </Table>
      <Divider>Stances</Divider>
      <Table>
        <TableRow>
          <StyleSelectors />
        </TableRow>
        <TableRow>
          <FormSelectors />
        </TableRow>
      </Table>
    </>
  )
}
