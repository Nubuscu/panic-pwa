import { Divider, FormGroup, FormLabel, MenuItem, Select } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { HeroType } from "../../../types"
import { setArchetype, setType } from "../../../../features/hero/heroSlice"
import { archetypes, defaultArchetype } from "../../../textContent"
import { BuildSelector } from "../BuildSelector"
import { FocusedStances } from "./focusedStances"
import { FusedStances } from "./fusedStances"
import { FranticStances } from "./franticStances"

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
  return (
    <FormGroup className="archetypeSelectors">
      {allHeroArchetypes.map((a, i) => (
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
      ))}
    </FormGroup>
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
  let stanceComponent = <></>
  switch (hero.type) {
    case HeroType.Focused:
      stanceComponent = <FocusedStances />
      break
    case HeroType.Fused:
      stanceComponent = <FusedStances />
      break
    case HeroType.Frantic:
      stanceComponent = <FranticStances />
      break
  }
  return (
    <>
      <FormGroup>
        <FormLabel>Build</FormLabel>
        <BuildSelector />
        <FormLabel>Hero Type</FormLabel>
        {heroTypeSelector}
        <FormLabel>Archetypes</FormLabel>
        <ArchetypeSelectors />
      </FormGroup>
      <Divider>Stances</Divider>
      {stanceComponent}
    </>
  )
}
