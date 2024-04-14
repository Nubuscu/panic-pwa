import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { Hero } from "../../app/types"
import { HeroType } from "../../app/types"
import {
  archetypes,
  builds,
  defaultArchetype,
  defaultForm,
  defaultStyle,
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

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
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

    // TODO rest of the fields
  },
})

export const { setName, setType, setArchetype } = heroSlice.actions

export const selectHero = (state: RootState) => state.hero.hero
