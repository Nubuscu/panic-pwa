import { ListSubheader, MenuItem, Select } from "@mui/material"
import {
  combineForms,
  setForm,
  setStyle,
  splitForms,
} from "../../../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import type { Archetype, Form, Style } from "../../../types"
import {
  archetypes,
  defaultArchetype,
  defaultForm,
  forms,
  styles,
} from "../../../textContent"
import { useState } from "react"

const SingleFormSelector = ({ index }: { index: number }) => {
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

/**
 * Component for building/setting forbidden forms.
 * uses local state to select the two sub-forms, then percolates that to redux state when both are selected
 */
const ForbiddenFormSelector = ({ index }: { index: number }) => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const handleDisabled = (form: Form) => hero.forms.includes(form)

  const handleGlobalStateChange = (form1: Form, form2: Form) => {
    if (form1 !== defaultForm && form2 !== defaultForm) {
      const forbiddenForm = combineForms(form1, form2)
      dispatch(setForm({ form: forbiddenForm, number: index }))
    }
  }

  const [prefill1, prefill2] = splitForms(hero.forms[index].key)
  const [form1, setForm1] = useState(prefill1 ?? hero.forms[index])
  const [form2, setForm2] = useState(prefill2 ?? defaultForm)

  return (
    <>
      <Select
        value={form1.name}
        onChange={e => {
          const found =
            forms.find(f => f.name === e.target.value) ?? defaultForm
          setForm1(found)
          handleGlobalStateChange(found, form2)
        }}
      >
        {forms.map(f => (
          <MenuItem key={f.name} value={f.name} disabled={handleDisabled(f)}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={form2.name}
        onChange={e => {
          const found =
            forms.find(f => f.name === e.target.value) ?? defaultForm
          setForm2(found)
          handleGlobalStateChange(form1, found)
        }}
      >
        {forms.map(f => (
          <MenuItem key={f.name} value={f.name} disabled={handleDisabled(f)}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
export const FormSelector = ({ index }: { index: number }) => {
  const hero = useAppSelector(state => state.hero.hero)

  const pairedStyle = hero.styles[index]
  const showForbiddenSelector = pairedStyle.key === "56"

  return (
    <>
      {showForbiddenSelector ? (
        <ForbiddenFormSelector index={index} />
      ) : (
        <SingleFormSelector index={index} />
      )}
    </>
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
