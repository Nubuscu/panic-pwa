import { configureStore, combineSlices, Tuple } from "@reduxjs/toolkit"
import { heroSlice } from "../features/hero/heroSlice"
import { gameStateSlice } from "../features/hero/gameStateSlice"
import { createListenerMiddleware } from "@reduxjs/toolkit"
import { GameState, Hero } from "./types"

const rootReducer = combineSlices(heroSlice, gameStateSlice)
export const urlMiddleware = createListenerMiddleware()

urlMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // fire on all events, ever
    return true
  },
  effect: async (action, listenerApi) => {
    let state = listenerApi.getState() as { hero: Hero; gameState: GameState }
    window.location.hash = `#${btoa(JSON.stringify(state))}`
  },
})

export const store = configureStore({
  reducer: {
    hero: rootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(urlMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
