import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { CharacterSlice } from "./features/characterSlice"

const rootReducer = combineSlices(CharacterSlice)

export const storeV2 = configureStore({
  reducer: {
    store: rootReducer,
  },
})

export type RootState = ReturnType<typeof storeV2.getState>
export type AppDispatch = typeof storeV2.dispatch
