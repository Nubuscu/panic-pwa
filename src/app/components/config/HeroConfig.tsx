import {
  Divider,
  ListSubheader,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import type { Archetype, Form, Style } from "../../types"
import { HeroType } from "../../types"
import {
  setArchetype,
  setForm,
  setStyle,
  setType,
} from "../../../features/hero/heroSlice"
import { archetypes, defaultArchetype, forms, styles } from "../../textContent"
import { BuildSelector } from "./BuildSelector"
import type { JSX } from "react/jsx-runtime"

const ArchetypeSelectors = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  let allHeroArchetypes = []
  switch (hero.type) {
    case HeroType.Focused:
      allHeroArchetypes.push(hero.archetypes[0])
      break
    case HeroType.Fused:
      allHeroArchetypes.push(hero.archetypes[0])
      allHeroArchetypes.push(hero.archetypes[1])
      break
    case HeroType.Frantic:
      allHeroArchetypes.push(hero.archetypes[0])
      allHeroArchetypes.push(hero.archetypes[1])
      allHeroArchetypes.push(hero.archetypes[2])
  }
  const selectedArchetypes = allHeroArchetypes.filter(
    a => a !== defaultArchetype,
  )
  return allHeroArchetypes.map((a, i) => (
    <span className="archetypeSelectors">
      <Select
        value={a.name}
        onChange={e => {
          dispatch(
            setArchetype({
              archetypeName: e.target.value,
              number: i,
            }),
          )
        }}
      >
        {archetypes.map(arch => (
          <MenuItem
            key={arch.name}
            value={arch.name}
            disabled={selectedArchetypes.includes(arch)}
          >
            {arch.name}
          </MenuItem>
        ))}
      </Select>
    </span>
  ))
}

const StyleSelector = ({
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

const FormSelector = ({ index }: { index: number }) => {
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

export const HeroConfig = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const heroTypeSelector = (
    <Select
      value={hero.type}
      onChange={e => {
        if (e.target.value in HeroType) {
          dispatch(setType(HeroType[e.target.value as keyof typeof HeroType]))
        }
      }}
    >
      {Object.keys(HeroType).map(t => (
        <MenuItem key={t} value={t}>
          {t}
        </MenuItem>
      ))}
    </Select>
  )
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
          <TableCell align="right">Hero Type:</TableCell>
          <TableCell>{heroTypeSelector}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">Archetypes:</TableCell>
          <TableCell>
            <ArchetypeSelectors />
          </TableCell>
        </TableRow>
      </Table>
      <Divider>Stances</Divider>
      <Table>
        <TableRow>
          {hero.styles.map((style, i) => (
            <TableCell align="center">
              <StyleSelector fromArchetypes={hero.archetypes} index={i} />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          {hero.forms.map((form, i) => (
            <TableCell align="center">
              <FormSelector index={i} />
            </TableCell>
          ))}
        </TableRow>
      </Table>
    </>
  )
}
