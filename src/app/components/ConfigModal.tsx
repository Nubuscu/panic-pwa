import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import type { Form, Style } from "../types"
import { HeroType } from "../types"
import {
  archetypes,
  builds,
  defaultArchetype,
  forms,
  styles,
} from "../textContent"
import {
  setArchetype,
  setName,
  setType,
  setStyle,
  setForm,
  setBuild,
} from "../../features/hero/heroSlice"
import { Button, Card, CardContent, Modal } from "@mui/material"

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
}

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
      <select
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
          <option
            key={arch.name}
            value={arch.name}
            disabled={selectedArchetypes.includes(arch)}
          >
            {arch.name}
          </option>
        ))}
      </select>
    </span>
  ))
}

const StyleSelectors = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const availableStyles = styles.filter(s =>
    hero.archetypes.map(a => a.name).includes(s.parentArchetypeName),
  )

  const handleDisabled = (style: Style) => hero.styles.includes(style)

  return hero.styles.map((style, i) => (
    <select
      value={style.name}
      onChange={e => {
        dispatch(setStyle({ styleName: e.target.value, number: i }))
      }}
    >
      {availableStyles.map(s => (
        <option key={s.name} value={s.name} disabled={handleDisabled(s)}>
          {s.name}
        </option>
      ))}
    </select>
  ))
}

const FormSelectors = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  const handleDisabled = (form: Form) => hero.forms.includes(form)

  return hero.forms.map((form, i) => (
    <select
      value={form.name}
      onChange={e => {
        dispatch(setForm({ formName: e.target.value, number: i }))
      }}
    >
      {forms.map(f => (
        <option key={f.name} value={f.name} disabled={handleDisabled(f)}>
          {f.name}
        </option>
      ))}
    </select>
  ))
}

export const ConfigModal = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const nameInput = (
    <input
      value={hero.name}
      onChange={e => {
        dispatch(setName(e.target.value))
      }}
    ></input>
  )
  const heroTypeSelector = (
    <select
      value={hero.type}
      onChange={e => {
        if (e.target.value in HeroType) {
          dispatch(setType(HeroType[e.target.value as keyof typeof HeroType]))
        }
      }}
    >
      {Object.keys(HeroType).map(t => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  )

  const buildSelector = (
    <select
      value={hero.build.name}
      onChange={e => {
        const buildForName = builds.find(b => b.name === e.target.value)
        if (buildForName !== undefined) {
          dispatch(setBuild(buildForName))
        }
      }}
    >
      {builds.map(b => (
        <option key={b.name} value={b.name}>
          {b.name}
        </option>
      ))}
    </select>
  )
  return (
    <>
      <Button onClick={handleOpen}>Edit Character</Button>
      <Modal open={open} onClose={handleClose}>
        <Card sx={boxStyle}>
          <CardContent>
            {nameInput}
            {buildSelector}
            {heroTypeSelector}
            <ArchetypeSelectors />
            <br />
            <StyleSelectors />
            <br />
            <FormSelectors />
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}
