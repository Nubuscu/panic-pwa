import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Hero, HeroType } from "../../app/types";
import { builds, defaultArchetype, defaultForm, defaultStyle } from '../../app/textContent';

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

export const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
        // TODO rest of the fields
    },
})

export const { setName } = heroSlice.actions

export const selectHero = (state: RootState) => state.hero.hero
