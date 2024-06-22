import { ListSubheader, MenuItem, Select } from "@mui/material"
import { setForm, setStyle } from "../../../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import type { Archetype, Form, Style } from "../../../types"
import {
  archetypes,
  defaultArchetype,
  forms,
  styles,
} from "../../../textContent"

export const FormSelector = ({ index }: { index: number }) => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const handleDisabled = (form: Form) => hero.forms.includes(form)
  return (
    <Select
      value={hero.forms[index].name}
      onChange={e => {
        dispatch(setForm({ formName: e.target.value, number: index }))
      }}
    >
      {forms.map(f => (
        <MenuItem key={f.name} value={f.name} disabled={handleDisabled(f)}>
          {f.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export const StyleSelector = ({
  index,
  fromArchetypes = [],
}: {
  index: number
  fromArchetypes: Archetype[]
}) => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const handleDisabled = (style: Style) => hero.styles.includes(style)

  const nonDefaultFronArchetypes = fromArchetypes.filter(
    arch => arch !== defaultArchetype,
  )
  const archetypeOptions =
    nonDefaultFronArchetypes.length > 0 ? nonDefaultFronArchetypes : archetypes

  let menuItems: JSX.Element[] = []
  archetypeOptions.forEach(archetype => {
    const headerComponent = <ListSubheader>{archetype.name}</ListSubheader>
    menuItems.push(headerComponent)
    const menuComponents = styles
      .filter(s => archetype.name === s.parentArchetypeName)
      .map(s => (
        <MenuItem key={s.name} value={s.name} disabled={handleDisabled(s)}>
          {s.name}
        </MenuItem>
      ))
    menuItems = [...menuItems, ...menuComponents]
  })
  return (
    <Select
      value={hero.styles[index].name}
      onChange={e => {
        dispatch(setStyle({ styleName: e.target.value, number: index }))
      }}
    >
      {menuItems}
    </Select>
  )
}
