import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Build, Hero } from "../../app/types"
import { HeroType } from "../../app/types"
import {
  archetypes,
  builds,
  defaultArchetype,
  defaultForm,
  defaultStyle,
  forms,
  styles,
} from "../../app/textContent"

const initialState: Hero = {
  name: "Jimmy Space",
  type: HeroType.Focused,
  build: builds[0],
  archetype1: defaultArchetype,
  archetype2: defaultArchetype,
  archetype3: defaultArchetype,
  form1: defaultForm,
  form2: defaultForm,
  form3: defaultForm,
  style1: defaultStyle,
  style2: defaultStyle,
  style3: defaultStyle,
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
export const heroSlice = createSlice({
  name: "hero",
  initialState: () => {
    try {
      const hash = atob(window.location.hash.substring(1))
      const urlState = JSON.parse(hash) as { hero: { hero: Hero } }
      return urlState.hero.hero
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
          state.archetype2 = defaultArchetype
          state.archetype3 = defaultArchetype
          break
        case HeroType.Fused:
          state.archetype3 = defaultArchetype
          break
      }
    },
    setArchetype: (state, action: PayloadAction<ArchetypeUpdate>) => {
      const archForName = archetypes.find(
        v => v.name === action.payload.archetypeName,
      )
      if (archForName !== undefined) {
        switch (action.payload.number) {
          case 1:
            state.archetype1 = archForName
            break
          case 2:
            state.archetype2 = archForName
            break
          case 3:
            state.archetype3 = archForName
            break
        }
      }
    },
    setStyle: (state, action: PayloadAction<StyleUpdate>) => {
      const styleForName = styles.find(v => v.name === action.payload.styleName)
      if (styleForName !== undefined) {
        switch (action.payload.number) {
          case 1:
            state.style1 = styleForName
            break
          case 2:
            state.style2 = styleForName
            break
          case 3:
            state.style3 = styleForName
            break
        }
      }
    },
    setForm: (state, action: PayloadAction<FormUpdate>) => {
      const formForName = forms.find(v => v.name === action.payload.formName)
      if (formForName !== undefined) {
        switch (action.payload.number) {
          case 1:
            state.form1 = formForName
            break
          case 2:
            state.form2 = formForName
            break
          case 3:
            state.form3 = formForName
            break
        }
      }
    },
  },
})

export const { setName, setBuild, setType, setArchetype, setStyle, setForm } =
  heroSlice.actions

export const selectHero = (state: RootState) => state.hero.hero
