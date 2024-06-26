import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Build, Hero } from "../../app/types"
import { CharacterType } from "../../app/types"
import { HeroType } from "../../app/types"
import {
  archetypes,
  bossArchetypes,
  builds,
  defaultArchetype,
  defaultForm,
  defaultStyle,
  forms,
  styles,
} from "../../app/textContent"

const initialState: Hero = {
  characterType: CharacterType.Hero,
  name: "Jimmy Space",
  type: HeroType.Focused,
  build: builds[0],
  archetypes: [defaultArchetype, defaultArchetype, defaultArchetype],
  forms: [defaultForm, defaultForm, defaultForm],
  styles: [defaultStyle, defaultStyle, defaultStyle],
  selectedFormIndex: 0,
  selectedStyleIndex: 0,
}

interface ArchetypeUpdate {
  archetypeName: string
  number: number
}
interface StyleUpdate {
  styleName: string
  number: number
}
interface FormUpdate {
  formName: string
  number: number
}
export const serializeHero = (hero: Hero): string[] => {
  return [
    hero.characterType,
    hero.name,
    hero.type,
    hero.build.key,
    hero.archetypes[0].key,
    hero.archetypes[1].key,
    hero.archetypes[2].key,
    hero.forms[0].key,
    hero.forms[1].key,
    hero.forms[2].key,
    hero.styles[0].key,
    hero.styles[1].key,
    hero.styles[2].key,
  ]
}
export const deserializeHero = (serialized: string[]): Hero => {
  const resolveArchetype = (archName: string) =>
    archetypes.find(a => a.key === archName) ?? defaultArchetype
  const resolveStyle = (styleName: string) =>
    styles.find(s => s.key === styleName) ?? defaultStyle
  const resolveForm = (formName: string) =>
    forms.find(f => f.key === formName) ?? defaultForm
  return {
    characterType:
      CharacterType[serialized[0] as keyof typeof CharacterType] ??
      CharacterType.Hero,
    name: serialized[1],
    type: HeroType[serialized[2] as keyof typeof HeroType] ?? HeroType.Focused,
    build: builds.find(b => b.key === serialized[3]) ?? builds[0],
    archetypes: [
      resolveArchetype(serialized[4]),
      resolveArchetype(serialized[5]),
      resolveArchetype(serialized[6]),
    ],
    forms: [
      resolveForm(serialized[7]),
      resolveForm(serialized[8]),
      resolveForm(serialized[9]),
    ],
    styles: [
      resolveStyle(serialized[10]),
      resolveStyle(serialized[11]),
      resolveStyle(serialized[12]),
    ],
    selectedFormIndex: 0,
    selectedStyleIndex: 0,
  }
}
export const heroSlice = createSlice({
  name: "hero",
  initialState: () => {
    try {
      const raw = atob(window.location.hash.substring(1))
      const urlState = JSON.parse(raw) as { hero: string[] }
      return deserializeHero(urlState.hero)
    } catch (err) {
      console.warn(err)
      return initialState
    }
  },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setBuild: (state, action: PayloadAction<Build>) => {
      state.build = action.payload
    },
    setType: (state, action: PayloadAction<HeroType>) => {
      state.type = action.payload
      // reset unused archetypes back to default
      switch (state.type) {
        case HeroType.Focused:
          state.archetypes[1] = defaultArchetype
          state.archetypes[2] = defaultArchetype
          break
        case HeroType.Fused:
          state.archetypes[2] = defaultArchetype
          break
      }
    },
    setArchetype: (state, action: PayloadAction<ArchetypeUpdate>) => {
      const archForName = [
        defaultArchetype,
        ...archetypes,
        ...bossArchetypes,
      ].find(v => v.name === action.payload.archetypeName)
      if (archForName !== undefined) {
        state.archetypes[action.payload.number] = archForName
      }
    },
    setStyle: (state, action: PayloadAction<StyleUpdate>) => {
      const styleForName = styles.find(v => v.name === action.payload.styleName)
      if (styleForName !== undefined) {
        state.styles[action.payload.number] = styleForName
      }
    },
    setForm: (state, action: PayloadAction<FormUpdate>) => {
      const formForName = forms.find(v => v.name === action.payload.formName)
      if (formForName !== undefined) {
        state.forms[action.payload.number] = formForName
      }
    },
    setSelectedStyle: (state, action: PayloadAction<number>) => {
      state.selectedStyleIndex = action.payload
    },
    setSelectedForm: (state, action: PayloadAction<number>) => {
      state.selectedFormIndex = action.payload
    },
    setCharacterType: (state, action: PayloadAction<CharacterType>) => {
      state.characterType = action.payload
      // reset all arch/form/style selections
      state.archetypes = [defaultArchetype, defaultArchetype, defaultArchetype]
      state.forms = [defaultForm, defaultForm, defaultForm]
      state.styles = [defaultStyle, defaultStyle, defaultStyle]
    },
    resetHero: state => {
      state = initialState
    },
  },
})

export const {
  setName,
  setBuild,
  setType,
  setArchetype,
  setStyle,
  setForm,
  setSelectedForm,
  setSelectedStyle,
  setCharacterType,
  resetHero,
} = heroSlice.actions

export const selectHero = (state: RootState) => state.hero.hero
